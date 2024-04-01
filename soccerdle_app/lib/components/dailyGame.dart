// ignore_for_file: prefer_const_constructors

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
  int _currentGuessIndex = 0;

  String message = "";
  var dailyPlayer;
  var pToday, fToday;
  String guess = "";
  bool gameEnded = false;
  List<String> guessesMade = [];
  int currentGuessIndex = 0;
  String hint = "";
  List<bool> hintdex = [];
  bool showModal = false;
  var gameSummary;
  var userData;

  @override
  void initState() {
    super.initState();
    dailyUserGuess();
  }

  Future<void> dailyUserGuess() async {
    try {
      http.Response response = await http.post(
        Uri.parse('http://localhost:5001/api/players/getDailyPlayer'),
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
        message = "Error occurred. Please try again later!";
      });
    }
    var obj = {"username": userData["username"]};
    var js = json.encode(obj);
    try {
      http.Response response = await http.post(
        Uri.parse('http://localhost:5001/api/daily/getGuesses'),
        body: js,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      //print(obj);
      if (response.statusCode != 200) {
        throw Exception("Failed to obtain daily player data!");
      }
      var guessdata = json.decode(response.body);
      pToday = guessdata["playedToday"];
      fToday = guessdata["finishedToday"];
      if (!pToday) {
        var object = {
          "username": userData["username"],
          "guess": null,
          "tryAmount": 0
        };
        var js = json.encode(object);
        try {
          var response2 = await http.post(
            Uri.parse('http://localhost:5001/api/daily/updateGuess'),
            body: js,
            headers: {"Content-Type": "application/json"},
          );
          if (response2.statusCode != 200) {
            throw Exception("Failed to obtain daily player data!");
          }
        } catch (e) {
          setState(() {
            message = "Error occurred. Please try again later!";
          });
          return;
        }
      } else if (pToday && !fToday) {
        var updatedGuessesMade = (guessdata["guesses"] ?? [])
            .where((guess) => guess.trim() != '')
            .toList();
        var updatedCurrentGuessIndex = updatedGuessesMade.length;
        var updatedHintdex = guessdata["hints"];
        setState(() {
          guessesMade = updatedGuessesMade;
          currentGuessIndex = updatedCurrentGuessIndex;
          hintdex = updatedHintdex;
        });
      } else if (fToday) {
        var updatedGuessesMade = (guessdata["guesses"] ?? [])
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
            Uri.parse('http://localhost:5001/api/daily/endGame'),
            body: json.encode({
              "username": userData["username"],
              "score": 0,
              "tryAmount": updatedGuessesMade.length + 1
            }),
            headers: {"Content-Type": "application/json"},
          );
          if (responseEnd.statusCode != 200) {
            throw Exception("Failed to fetch game summary stats!");
          }
          var data = json.decode(responseEnd.body);
          setState(() {
            gameSummary = data;
            showModal = true;
          });
        } catch (error) {
          setState(() {
            message = "Error occurred. Please try again later!";
          });
          return;
        }
      }
    } catch (e) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
      return;
    }
  }

  updateHintdex(int i) async {
    var obj = {"username": userData["username"], "dex": i};
    var js = json.encode(obj);
    try {
      var response = await http.post(
        Uri.parse('http://localhost:5001/api/daily/updateHints'),
        body: js,
        headers: {"Content-Type": "application/json"},
      );
      if (response.statusCode != 200) {
        throw Exception("Failed to update hints!");
      }
      var data = json.decode(response.body);
      var updateHintdex = data["hints"];
      setState(() {
        hintdex = updateHintdex;
      });
    } catch (e) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
      return;
    }
  }

  revealHint(int index) {
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
          hint = "";
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
        return "";
    }
  }

  updateGuess(input) async {
    var obj = {
      "username": userData["username"],
      "guess": input.trim(),
      "tryAmount": guessesMade.length + 1
    };
    var js = json.encode(obj);
    try {
      var response = await http.post(
        Uri.parse('http://localhost:5001/api/daily/updateGuess'),
        body: js,
        headers: {"Content-Type": "application/json"},
      );
      if (response.statusCode != 200) {
        throw Exception("Failed to update guess!");
      }
    } catch (e) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
      return;
    }
  }

  checkGuess() {
    if (guess.trim() == "") {
      return;
    }
    updateGuess(guess.trim());
    var currentGuess = guess.trim().toLowerCase();
    var correctNameLower = dailyPlayer["name"].toLowerCase();
    var isCorrectGuess = currentGuess == correctNameLower;
    var updatedGuessesMade = List<String>.from(guessesMade);
    updatedGuessesMade[currentGuessIndex] = guess;
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
        guess = "";
      });
    }
  }

  Score(int input) async {
    var obj = {"username": userData["username"], "dailyScore": input};
    var js = json.encode(obj);
    try {
      var response = await http.post(
        Uri.parse('http://localhost:5001/api/daily/updateScore'),
        body: js,
        headers: {"Content-Type": "application/json"},
      );
      if (response.statusCode != 200) {
        throw Exception("Failed to update score!");
      }
    } catch (e) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
      return;
    }
  }

  handleGameEnd(int scores, int tries) async {
    try {
      var responseEnd = await http.post(
        Uri.parse('http://localhost:5001/api/daily/endGame'),
        body: json.encode({
          "username": userData["username"],
          "score": scores,
          "tryAmount": tries
        }),
        headers: {"Content-Type": "application/json"},
      );
      if (responseEnd.statusCode != 200) {
        throw Exception("Failed to fetch game summary stats!");
      }
      var data = json.decode(responseEnd.body);
      setState(() {
        gameSummary = data;
        showModal = true;
      });
    } catch (error) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
      return;
    }
  }

  void _hintRevealed(int index) {
    setState(() {
      _showHints[index] = !_showHints[index];
    });
  }

  String _getHint(int index) {
    switch (index) {
      case 0:
        return 'Nationality ';
      case 1:
        return 'Age';
      case 2:
        return 'League';
      case 3:
        return 'Club';
      case 4:
        return 'Position';
      default:
        return 'Unknown';
    }
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
        List.generate(_currentGuessIndex, (index) {
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
                    'Guess ${index + 1}: ${guessControllers[index].text}',
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
                            child: Text(
                              _getHint(index),
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
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
        Center(
          child: Text(
            'Guess ${_currentGuessIndex + 1}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ), // dailyUserGuess
        TextFormField(
          controller: guessControllers[_currentGuessIndex],
          onEditingComplete: () {
            setState(() {
              dailyUserGuess();

              if (_currentGuessIndex < 5) {
                _currentGuessIndex++;
              }
            });
          },
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
      ],
    );
  }
}
