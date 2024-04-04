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

  String message = '';
  var dailyPlayer;
  var pToday, fToday;
  String guess = '';
  bool gameEnded = false;
  List<String> guessesMade = [];
  String hint = '';
  List<bool> hintdex = [];
  bool showModal = false;
  var gameSummary;
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
      // print(dailyPlayer);
    } catch (e) {
      setState(() {
        message = 'Error occurred. Please try again later!';
      });
    }

    try {
      http.Response response = await http.post(
        Uri.parse('$baseUrl/api/daily/getGuesses'),
        body: jsonEncode({
          'username': 'lablard',
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      //print(response.body);

      if (response.statusCode != 200) {
        throw Exception('Failed to obtain daily player data!');
      }
      var guessdata = json.decode(response.body);
      pToday = guessdata['playedToday'];
      fToday = guessdata['finishedToday'];
      if (!pToday) {
        try {
          var response2 = await http.post(
            Uri.parse('$baseUrl/api/daily/updateGuess'),
            body: json.encode({
              'username': 'lablard',
              'guess': null,
              'tryAmount': 0,
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );
          print(response2.body);
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
        setState(() {
          guessesMade = updatedGuessesMade;
          hintdex = updatedHintdex;
        });
      } else if (fToday) {
        var updatedGuessesMade = (guessdata['guesses'] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();
        var updatedHintdex = guessdata['hints'];
        setState(() {
          guessesMade = updatedGuessesMade;
          hintdex = updatedHintdex;
          gameEnded = true;
        });
        try {
          var responseEnd = await http.post(
            Uri.parse('$baseUrl/api/daily/endGame'),
            body: json.encode({
              'username': 'lablard',
              'score': 0,
              'tryAmount': updatedGuessesMade.length + 1
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
          );
          if (responseEnd.statusCode != 200) {
            throw Exception('Failed to fetch game summary stats!');
          }
          var data = json.decode(responseEnd.body);
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
          'username': 'lablard',
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
      var updateHintdex = data['hints'];
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
          'username': 'lablard',
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

  List<Widget> previousGuessWidgets = [];
  void checkGuess() {
    if (guess.trim() == '') {
      return;
    }
    updateGuess(guess.trim());

    // Create a list to hold the previous guess widgets

    // Add guesses from guessControllers to guessesMade and create widgets for previous guesses
    for (var controller in guessControllers) {
      var guessText = controller.text.trim();
      if (guessText.isNotEmpty) {
        guessesMade.add(guessText);

        // Create widget for previous guess
        previousGuessWidgets.add(
          Column(
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
                        'Guess ${currentGuessIndex + 1}: ${guessControllers[currentGuessIndex].text}',
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: _showHints[currentGuessIndex]
                            ? Colors.green
                            : Colors.blue,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: _showHints[currentGuessIndex]
                          ? Padding(
                              padding: const EdgeInsets.all(10.0),
                              child: Container(
                                color: Colors.white,
                                padding: EdgeInsets.all(8),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      getHint(currentGuessIndex),
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                    ),
                                    if (currentGuessIndex == 0)
                                      Image.network(
                                          dailyPlayer['country_flag']),
                                    if (currentGuessIndex == 3)
                                      Image.network(dailyPlayer['club_logo']),
                                  ],
                                ),
                              ),
                            )
                          : GestureDetector(
                              onTap: () {
                                _hintRevealed(currentGuessIndex);
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
          ),
        );
      }
    }

    // Clear all text fields in guessControllers
    guessControllers.forEach((controller) {
      controller.clear();
    });

    var currentGuess = guess.trim().toLowerCase();
    if (dailyPlayer != null) {
      var correctNameLower = dailyPlayer['name'].toLowerCase();
      var isCorrectGuess = currentGuess == correctNameLower;

      var updatedGuessesMade = List<String>.from(guessesMade);
      print(updatedGuessesMade);
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
          if (hintdex[0]) s -= 1;
          if (hintdex[1]) s -= 3;
          if (hintdex[2]) s -= 3;
          if (hintdex[3]) s -= 3;
          if (hintdex[4]) s -= 5;
          Score(s);
          handleGameEnd(s, guessesMade.length + 1);
        } else {
          Score(0);
          handleGameEnd(s, 7);
        }
      } else {
        setState(() {
          currentGuessIndex += 1;
          //guess = '';
        });
      }
    }
  }

  Future<void> Score(int input) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/api/daily/updateScore'),
        body: jsonEncode({
          'username': 'lablard',
          'dailyScore': input,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      // print(response.body);
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

  Future<void> handleGameEnd(int scores, int tries) async {
    try {
      var responseEnd = await http.post(
        Uri.parse('$baseUrl/api/daily/endGame'),
        body: json.encode(
            {'username': 'lablard', 'score': scores, 'tryAmount': tries}),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      );
      if (responseEnd.statusCode != 200) {
        throw Exception('Failed to fetch game summary stats!');
      }
      var data = json.decode(responseEnd.body);
      print(data);
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

  void open() {
    setState(() {
      showModal = true;
    });
  }

  void close() {
    setState(() {
      showModal = false;
    });
  }

  void _hintRevealed(int index) {
    setState(() {
      _showHints[index] = !_showHints[index];
    });
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
            'Guess ${currentGuessIndex + 1}', // Changed variable name
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
        // Show Hint Button
        if (!_showHints[
            currentGuessIndex]) // Show the button only if the hint is not revealed
          Center(
            child: ElevatedButton(
              onPressed: () {
                _hintRevealed(currentGuessIndex);
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
              ),
              child: Text('Show Hint'),
            ),
          ),
        SizedBox(height: 10),
        // Display hint if revealed
        if (_showHints[currentGuessIndex])
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Text(
              getHint(currentGuessIndex),
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
          ),
        SizedBox(height: 10),
        // Display images for specific hints
        if (_showHints[currentGuessIndex] && currentGuessIndex == 0)
          Center(
            child: Image.network(
              dailyPlayer['country_flag'],
              width: 150,
            ),
          ),
        if (_showHints[currentGuessIndex] && currentGuessIndex == 3)
          Center(
            child: Image.network(
              dailyPlayer['club_logo'],
              width: 150,
            ),
          ),
        /*if (!gameEnded)
          Container(
            width: 300,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(5),
              color: Colors.white,
            ),
            padding: EdgeInsets.all(10),
            child: Column(
              children: [
                Text('Guess ${guessesMade.length + 1}:'),
                TextField(
                  onChanged: (val) {
                    setState(() {
                      guess = val;
                    });
                  },
                  onSubmitted: (val) {
                    checkGuess();
                  },
                  maxLength: 15,
                  autofocus: true,
                ),
              ],
            ),
          ),*/
        if (gameEnded)
          Column(
            children: [
              Text(
                guess.trim().toLowerCase() ==
                        dailyPlayer['name'].trim().toLowerCase()
                    ? 'You guessed it in ${guessesMade.length} ${guessesMade.length == 1 ? 'try!' : 'tries!'}'
                    : 'The player was ${dailyPlayer["name"]}',
                style: TextStyle(fontSize: 18),
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
            ],
          ),
        if (gameEnded)
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: open,
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.green),
                ),
                child: Text('Stats'),
              ),
              SizedBox(width: 10),
              // ElevatedButton(
              //   onPressed: goback,
              //   style: ButtonStyle(
              //     backgroundColor:
              //         MaterialStateProperty.all<Color>(Colors.green),
              //   ),
              //   child: Text('Home'),
              // ),
            ],
          ),
        if (gameEnded && showModal)
          Container(
            color: Colors.black.withOpacity(0.5),
            child: AlertDialog(
              title: Text('Game Summary'),
              content: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Streak: ${gameSummary["streak"]}'),
                  Text(
                      'Win Rate: ${(gameSummary["winRate"] as double).toStringAsFixed(2)}%'),
                  Text('Score for Today: ${gameSummary["score"]}'),
                  Text('All Time Score: ${gameSummary["allTimeScore"]}'),
                  Text('Guess Distribution'),
                  // Column(
                  //   children: (gameSummary["guessDistribution"] as List)
                  //       .map((count, index) {
                  //     return Text('${index + 1} : $count');
                  //   }).toList(),
                  // ),
                ],
              ),
              actions: [
                ElevatedButton(
                  onPressed: close,
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(Colors.green),
                  ),
                  child: Text('Close'),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
