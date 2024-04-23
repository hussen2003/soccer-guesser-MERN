import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:soccerdle_app/services/loginPageServices.dart';

class DailyGamePage extends StatefulWidget {
  static const String routeName = '/dailygame';
  const DailyGamePage({Key? key}) : super(key: key);

  @override
  _DailyGamePageState createState() => _DailyGamePageState();
}

class _DailyGamePageState extends State<DailyGamePage> {
  final List<TextEditingController> guessControllers =
      List.generate(6, (_) => TextEditingController());
  List<bool> _showHints = List.generate(6, (_) => false);
  int currentGuessIndex = 0;
  List<String> saveUserGuesses = [];
  String message = '';
  var dailyPlayer;
  late bool pToday = false, fToday = false;

  String guess = '';
  bool gameEnded = false;
  List<String> guessesMade = [];
  String hint = '';
  List<bool> hintdex = [false, false, false, false, false];
  bool showModal = false;
  dynamic gameSummary;
  var userData;

  @override
  void initState() {
    super.initState();
    dailyUserGuess();
  }

  final String baseUrl = 'http://soccerdle-mern-ace81d4f14ec.herokuapp.com';
  Future<void> dailyUserGuess() async {
    try {
      http.Response response = await http.post(
        Uri.parse('$baseUrl/api/players/getDailyPlayer'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      var data = json.decode(response.body);
      setState(() {
        dailyPlayer = data;
      });
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
    }

    try {
      http.Response response = await http.post(
        Uri.parse('$baseUrl/api/daily/getGuesses'),
        body: jsonEncode({
          'username': Storage.getUser(),
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      var guessdata = json.decode(response.body);

      pToday = guessdata['playedToday'];
      fToday = guessdata['finishedToday'];

      if (!pToday) {
        try {
          var response2 = await http.post(
            Uri.parse('$baseUrl/api/daily/updateGuess'),
            body: json.encode({
              'username': Storage.getUser(),
              'guess': null,
              'tryAmount': 0,
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );

          if (response2.statusCode != 200) {
            throw Exception('Failed to obtain daily player data!');
          }
        } catch (e) {
          setState(() {
            message = 'Error occurred. Please try again later!';
          });
          return;
        }
      }
      if (pToday && !fToday) {
        var updatedGuessesMade = (guessdata['guesses'] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();
        var updatedCurrentGuessIndex = updatedGuessesMade.length;
        var updatedHintdex = guessdata['hints'];

        setState(() {
          guessesMade = List<String>.from(updatedGuessesMade);
          currentGuessIndex = updatedCurrentGuessIndex;
          hintdex = List<bool>.from(updatedHintdex);
        });
      } else if (fToday) {
        var updatedGuessesMade = (guessdata['guesses'] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();
        var updatedCurrentGuessIndex = updatedGuessesMade.length;
        var updatedHintdex = guessdata["hints"];
        setState(() {
          guessesMade = List<String>.from(updatedGuessesMade);
          currentGuessIndex = updatedCurrentGuessIndex;
          hintdex = List<bool>.from(updatedHintdex);
          gameEnded = true;
        });

        try {
          var responseEnd = await http.post(
            Uri.parse('$baseUrl/api/daily/endGame'),
            body: json.encode({
              'username': Storage.getUser(),
              'score': 0,
              'tryAmount': updatedGuessesMade.length + 1
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );

          var data = json.decode(responseEnd.body);

          setState(() {
            gameSummary = data;
            showModal = true;
            showGameSummary();
          });
        } catch (error) {
          setState(() {
            message = 'Error occurred. Please try again later!';
          });
          return;
        }
      }
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
      return;
    }
  }

  Future<void> updateHintdex(int i) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/api/daily/updateHints'),
        body: json.encode({
          'username': Storage.getUser(),
          'dex': i,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      var data = json.decode(response.body);
      var updateHintdex = data["hints"];

      setState(() {
        hintdex = List<bool>.from(updateHintdex);
      });
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
      return;
    }
  }

  void revealHint(int index) {
    var updatedHintdex = List<bool>.from(hintdex);
    updatedHintdex[index] = true;
    updateHintdex(index);
    switch (index) {
      case 0:
        setState(() {
          hint = 'Nationality: ${dailyPlayer["nationality"]}';
        });
        break;
      case 1:
        setState(() {
          hint = 'Age: ${dailyPlayer["age"]}';
        });
        break;
      case 2:
        setState(() {
          hint = 'League: ${dailyPlayer["league"]}';
        });
        break;
      case 3:
        setState(() {
          hint = 'Club: ${dailyPlayer["club"]}';
        });
        break;
      case 4:
        setState(() {
          hint = 'Position: ${dailyPlayer["positions"]}';
        });
        break;
      default:
        setState(() {
          hint = '';
        });
    }
  }

  String getHint(int index) {
    switch (index) {
      case 0:
        return 'Nationality: ${dailyPlayer["nationality"]}';
      case 1:
        return 'Age: ${dailyPlayer["age"]}';
      case 2:
        return 'League: ${dailyPlayer["league"]}';
      case 3:
        return 'Club: ${dailyPlayer["club"]}';
      case 4:
        return 'Position: ${dailyPlayer["positions"]}';
      default:
        return '';
    }
  }

  Future<void> updateGuess(input) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/api/daily/updateGuess'),
        body: jsonEncode({
          'username': Storage.getUser(),
          'guess': input.trim(),
          'tryAmount': guessesMade.length + 1
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to update guess!');
      }
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
      return;
    }
  }

  void checkGuess() {
    if (guess.trim() == '') {
      return;
    }
    updateGuess(guess.trim());

    for (var controller in guessControllers) {
      var guessText = controller.text.trim();
      if (guessText.isNotEmpty) {
        guessesMade.add(guessText);
      }
    }

    saveUserGuesses = List<String>.from(guessesMade);

    guessControllers.forEach((controller) {
      controller.clear();
    });

    var currentGuess = guess.trim().toLowerCase();
    if (dailyPlayer != null) {
      var correctNameLower = dailyPlayer['name'].toLowerCase();
      var isCorrectGuess = currentGuess == correctNameLower;

      var updatedGuessesMade = List<String>.from(guessesMade);

      if (currentGuessIndex < guessesMade.length) {
        updatedGuessesMade[currentGuessIndex] = guess;
      } else {}
      setState(() {
        guessesMade = updatedGuessesMade;
      });
      if (isCorrectGuess || currentGuessIndex == 5) {
        setState(() {
          gameEnded = true;
        });
        var s = 0;
        if (isCorrectGuess) {
          switch (currentGuessIndex) {
            case 0:
              s = 100;
              break;
            case 1:
              s = 90;
              break;
            case 2:
              s = 75;
              break;
            case 3:
              s = 60;
              break;
            case 4:
              s = 45;
              break;
            case 5:
              s = 30;
              break;
            default:
              s = 0;
              break;
          }

          if (hintdex[0]) s -= 1;
          if (hintdex[1]) s -= 3;
          if (hintdex[2]) s -= 3;
          if (hintdex[3]) s -= 3;
          if (hintdex[4]) s -= 5;
          Score(s);

          handleGameEnd(s, currentGuessIndex + 1);
        } else {
          Score(0);
          handleGameEnd(s, 7);
        }
      } else {
        setState(() {
          if (currentGuessIndex < guessesMade.length) {
            currentGuessIndex += 1;
          }
          guess = '';
        });
      }
    }
  }

  Future<void> Score(int input) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/api/daily/updateScore'),
        body: jsonEncode({
          'username': Storage.getUser(),
          'dailyScore': input,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to update score!');
      }
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
      return;
    }
  }

  handleGameEnd(int scores, int tries) async {
    try {
      var responseEnd = await http.post(
        Uri.parse('$baseUrl/api/daily/endGame'),
        body: jsonEncode({
          'username': Storage.getUser(),
          'score': scores,
          'tryAmount': tries
        }),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      );

      var data = json.decode(responseEnd.body);

      setState(() {
        gameSummary = data;
        showModal = true;
      });
      showGameSummary();
    } catch (error) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
      return;
    }
  }

  void _hintRevealed(int index) {
    setState(() {
      _showHints[index] = !_showHints[index];
    });
  }

  void showGameSummary() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Container(
          color: Colors.black.withOpacity(0.5),
          child: AlertDialog(
            title: Text('Game Summary'),
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('Streak: ${gameSummary["streak"]}'),
                Text(
                  'Win Rate: ${gameSummary["winRate"].toStringAsFixed(2)}',
                ),
                Text('Score for Today: ${gameSummary["score"]}'),
                Text('All Time Score: ${gameSummary["allTimeScore"]}'),
                Text('Guess Distribution'),
                Column(
                  children: (gameSummary["guessDistribution"] as List)
                      .asMap()
                      .entries
                      .map((entry) {
                    return Text('${entry.key + 1} : ${entry.value}');
                  }).toList(),
                ),
              ],
            ),
            actions: [
              ElevatedButton(
                onPressed: Navigator.of(context).pop,
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4.0),
                    ),
                  ),
                ),
                child: Text(
                  'Close',
                  style: TextStyle(color: Colors.black),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
Widget build(BuildContext context) {
  return Center(
    child: SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Daily Game',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            _buildBackgroundImage(),
            dailyGameModeScreen(context),
          ],
         ),
        ),
      ),
    );
  }

  Widget _buildBackgroundImage() {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('lib/images/app.jpg'),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget dailyGameModeScreen(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(16.0, 30.0, 16.0, 30.0),
      child: Container(
        padding: EdgeInsets.all(5.0),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.8),
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildTextFormField(),
          ],
        ),
      ),
    );
  }

  Widget _buildTextFormField() {
    List<Widget> previousGuessWidgets =
        List.generate(guessesMade.length, (index) {
      String guess = guessesMade[index];
      bool hintShown = _showHints[index];
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(vertical: 15),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(6.0),
              border: Border.all(color: Color.fromARGB(255, 69, 4, 199)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    ' Guess ${index + 1}: $guess',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
                Container(
                  decoration: BoxDecoration(
                    color: hintShown
                        ? Color.fromARGB(255, 255, 255, 255)
                        : Colors.transparent,
                  ),
                  child: () {
                    if (index < hintdex.length && hintdex[index]) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Container(
                          color: Colors.white,
                          padding: EdgeInsets.all(8),
                          child: Column(
                            children: [
                              Text(
                                getHint(index),
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              if (index == 0)
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.network(
                                      dailyPlayer['country_flag'],
                                      height: 30,
                                      width: 30,
                                    ),
                                    SizedBox(width: 10),
                                  ],
                                ),
                              if (index == 3)
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.network(
                                      dailyPlayer['club_logo'],
                                      height: 30,
                                      width: 30,
                                    ),
                                    SizedBox(width: 10),
                                  ],
                                ),
                            ],
                          ),
                        ),
                      );
                    } else if (hintShown) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Container(
                          color: Colors.white,
                          padding: EdgeInsets.all(8),
                          child: Column(
                            children: [
                              Text(
                                getHint(index),
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              if (index == 0)
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.network(
                                      dailyPlayer['country_flag'],
                                      height: 30,
                                      width: 30,
                                    ),
                                    SizedBox(width: 10),
                                  ],
                                ),
                              if (index == 3)
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.network(
                                      dailyPlayer['club_logo'],
                                      height: 30,
                                      width: 30,
                                    ),
                                    SizedBox(width: 10),
                                  ],
                                ),
                            ],
                          ),
                        ),
                      );
                    } else if (index < 5 && !gameEnded) {
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Align(
                          alignment: Alignment.center,
                          child: ElevatedButton(
                            onPressed: () {
                              _hintRevealed(index);
                              revealHint(index);
                            },
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Color.fromARGB(255, 94, 11, 226),
                              backgroundColor: Colors.green,
                              padding: EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 10),
                              shape: RoundedRectangleBorder(),
                              elevation: 3,
                              shadowColor: Colors.grey.withOpacity(0.5),
                            ),
                            child: Text(
                              'Show Hint',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                        ),
                      );
                    }
                  }(),
                ),
              ],
            ),
          ),
        ],
      );
    });

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 30),
        Column(
          children: <Widget>[
            for (var widget in previousGuessWidgets) ...[
              widget,
              SizedBox(height: 10),
            ],
          ],
        ),
        if (!gameEnded)
          Center(
            child: Text(
              'Guess ${guessesMade.length + 1}',
              style: const TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        if (!gameEnded)
          TextField(
            controller: guessControllers[guessesMade.length],
            onChanged: (val) {
              setState(() {
                guess = val;
              });
            },
            onEditingComplete: () {
              setState(() {
                checkGuess();
              });
            },
            maxLength: 16,
            autofocus: true,
            decoration: InputDecoration(
              hintText: 'Enter your guess here',
              enabledBorder: const OutlineInputBorder(
                borderSide: BorderSide(color: Color.fromARGB(255, 69, 4, 199)),
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              fillColor: Colors.grey.shade200,
              filled: true,
              hintStyle: const TextStyle(color: Colors.black),
              border: const OutlineInputBorder(
                borderSide: BorderSide(color: Colors.white),
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
            ),
          ),
        if (gameEnded)
          Dialog(
                backgroundColor: Color.fromARGB(255, 252, 253, 253),
                shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15), 
                ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    guess.trim().toLowerCase() ==
                            dailyPlayer['name'].trim().toLowerCase()
                        ? 'You guessed it in ${guessesMade.length} ${guessesMade.length == 1 ? 'try!' : 'tries!'}'
                        : 'The player was ${dailyPlayer["name"]}',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
                SizedBox(height: 2),
                Image.network(
                  dailyPlayer['image'],
                  width: 150,
                ),
                SizedBox(height: 0.5),
                Image.network(
                  dailyPlayer['club_logo'],
                  width: 150,
                ),
                SizedBox(height: 1),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                  ElevatedButton(
                  onPressed: showGameSummary,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 33),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                  child: Text(' Stats '),
                ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/home',
                        );
                      },
                      child: Text('Home Page'),
                      style: ButtonStyle(
                        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
      ],
    );
  }
}
