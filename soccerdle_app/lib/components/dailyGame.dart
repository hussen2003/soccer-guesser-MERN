import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

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
  int currentGuessIndex = 0; // Changed variable name
  List<String> saveUserGuesses = [];
  String message = '';
  var dailyPlayer;
  var pToday, fToday;

  String guess = '';
  bool gameEnded = false;
  List<String> guessesMade = [];
  String hint = '';
  List<bool> hintdex = [];
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
      print('Daily player from database: $dailyPlayer\n');
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
    }

    try {
      http.Response response = await http.post(
        Uri.parse('$baseUrl/api/daily/getGuesses'),
        body: jsonEncode({
          'username': 'wablard',
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      print('Get guess from database: ${response.body}\n');
      var guessdata = json.decode(response.body);
      print('This is guess data ${guessdata}\n');
      print(response.statusCode);

      if (response.statusCode != 201) {
        throw Exception('Failed to obtain daily player data!');
      }

      pToday = guessdata['playedToday'];
      fToday = guessdata['finishedToday'];
      print('Today is played $pToday and finished $fToday\n');
      if (!pToday) {
        print('Player today: $pToday\n');
        try {
          var response2 = await http.post(
            Uri.parse('$baseUrl/api/daily/updateGuess'),
            body: json.encode({
              'username': 'wablard',
              'guess': null,
              'tryAmount': 0,
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );
          print(
              'Get guess from database and today player is false: ${response2.body}\n');
          if (response2.statusCode != 200) {
            throw Exception('Failed to obtain daily player data!');
          }
        } catch (e) {
          setState(() {
            message = 'Error occurred. Please try again later!';
          });
          return;
        }
      } else if (pToday && !fToday) {
        var updatedGuessesMade = (guessdata['guesses'] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();

        var updatedHintdex = guessdata['hints'];
        var updatedCurrentGuessIndex = updatedGuessesMade.length;

        setState(() {
          guessesMade = updatedGuessesMade;
          currentGuessIndex = updatedCurrentGuessIndex;
          hintdex = updatedHintdex;
        });
      } else if (fToday) {
        var updatedGuessesMade = (guessdata['guesses'] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();
        var updatedCurrentGuessIndex = updatedGuessesMade.length;
        var updatedHintdex = guessdata["hints"];
        setState(() {
          guessesMade = updatedGuessesMade;
          currentGuessIndex = updatedCurrentGuessIndex;
          hintdex = updatedHintdex;
          gameEnded = true;
        });
        try {
          var responseEnd = await http.post(
            Uri.parse('$baseUrl/api/daily/endGame'),
            body: json.encode({
              'username': 'wablard',
              'score': 0,
              'tryAmount': updatedGuessesMade.length + 1
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );
          if (responseEnd.statusCode != 200) {
            throw Exception('Failed to fetch game summary stats!');
          }
          var data = json.decode(responseEnd.body);

          print(
              'Get end game from database and today player is false: ${responseEnd.body}\n');
          setState(() {
            gameSummary = data;
            showModal = true;
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
          'username': 'wablard',
          'dex': i,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      print(response.body);
      if (response.statusCode != 200) {
        throw Exception('Failed to update hints!');
      }
      var data = json.decode(response.body);
      print(data);
      var updateHintdex = data["hints"];
      setState(() {
        hintdex = updateHintdex;
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
          'username': 'wablard',
          'guess': input.trim(),
          'tryAmount': guessesMade.length + 1
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      print(response.body); // WIP

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
      print('updatedGuessesMade in checkguess() is $updatedGuessesMade');
      if (currentGuessIndex < guessesMade.length) {
        updatedGuessesMade[currentGuessIndex] = guess;
      } else {
        // Adjust currentGuessIndex or handle the error appropriately
      }
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

          Score(s);
          print(
              'S in socre is $s and guessMadelength is ${guessesMade.length}');
          handleGameEnd(s, guessesMade.length + 1);
        } else {
          Score(0);
          handleGameEnd(s, 7);
        }
      } else {
        setState(() {
          currentGuessIndex += 1;
          guess = '';
        });
      }
    }
  }

  Future<void> Score(int input) async {
    print('The received score is $input');
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/api/daily/updateScore'),
        body: jsonEncode({
          'username': 'wablard',
          'dailyScore': input,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      print('Get the score from the database: ${response.body}');
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
        body: jsonEncode(
            {'username': 'wablard', 'score': scores, 'tryAmount': tries}),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      );

      var data = json.decode(responseEnd.body);

      print('Handle end game : $data\n');
      setState(() {
        gameSummary = data;
        showModal = true;
      });
      // Check if the user wins or loses based on scores
      if (scores > 0) {
        // If the score is greater than 0, the user wins
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Congratulations!'),
              content: Text('You won the game!'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(); // Close the dialog
                  },
                  child: Text('OK'),
                ),
              ],
            );
          },
        );
      } else {
        // If the score is 0, the user loses
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Game Over'),
              content: Text('You lost the game. Better luck next time!'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(); // Close the dialog
                  },
                  child: Text('OK'),
                ),
              ],
            );
          },
        );
      }
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
                  'Win Rate: ${gameSummary["winRate"]}',
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
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.green),
                ),
                child: Text('Close'),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Daily Game'),
        ),
        body: Stack(
          children: [
            _buildBackgroundImage(),
            unlimitedModeScreen(context),
          ],
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

  Widget unlimitedModeScreen(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildTextFormField(),
        ],
      ),
    );
  }

  Widget _buildTextFormField() {
    List<Widget> previousGuessWidgets =
        List.generate(currentGuessIndex, (index) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(
                bottom: BorderSide(
                  color: Colors.green,
                  width: 1.0,
                ),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'Guess ${index + 1}: ${saveUserGuesses[index]}',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
                Container(
                  decoration: BoxDecoration(
                    color: _showHints[index] ? Colors.green : Colors.blue,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: _showHints[index]
                      ? Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Container(
                            color: Colors.white,
                            padding: EdgeInsets.all(8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
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
                                  Image.network(dailyPlayer['country_flag']),
                                if (index == 3)
                                  Image.network(dailyPlayer['club_logo']),
                              ],
                            ),
                          ),
                        )
                      : GestureDetector(
                          onTap: () {
                            _hintRevealed(index);
                          },
                          child: Padding(
                            padding: const EdgeInsets.all(10.0),
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
                )
              ],
            ),
          ),
        ],
      );
    }).toList();

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
        Center(
          child: Text(
            'Guess ${currentGuessIndex + 1}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        TextField(
          controller: guessControllers[currentGuessIndex],
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
          maxLength: 15,
          autofocus: true,
          decoration: InputDecoration(
            hintText: 'Enter your guess here',
            enabledBorder: const OutlineInputBorder(
              borderSide: BorderSide(color: Colors.green),
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
                SizedBox(height: 10),
                Image.network(
                  dailyPlayer['image'],
                  width: 150,
                ),
                SizedBox(height: 10),
                Image.network(
                  dailyPlayer['club_logo'],
                  width: 150,
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: showGameSummary,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[100],
                        padding: const EdgeInsets.symmetric(
                            vertical: 30, horizontal: 30),
                      ),
                      child: Text('Stats'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/homePage',
                        );
                      },
                      child: Text('Home'),
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
