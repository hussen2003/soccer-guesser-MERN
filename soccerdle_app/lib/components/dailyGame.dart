import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DailyPage extends StatefulWidget {
  static const String routeName = '/dailyGamePage';
  const DailyPage({super.key});

  @override
  _DailyPageState createState() => _DailyPageState();
}

class _DailyPageState extends State<DailyPage> {
  String message = "";
  Map<String, dynamic>? dailyPlayer;
  List<String> guesses = [
    'Guess 1',
    'Guess 2',
    'Guess 3',
    'Guess 4',
    'Guess 5',
    'Guess 6'
  ];
  String guess = '';
  bool gameEnded = false;
  List<String> guessesMade = [];
  int currentGuessIndex = 0;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      final response = await http.post(
        Uri.parse('http://localhost:5001/api/players/getDailyPlayer'),
        headers: {"Content-Type": "application/json"},
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to obtain daily player data!');
      }
      final data = jsonDecode(response.body);
      setState(() {
        dailyPlayer = data;
      });
    } catch (e) {
      setState(() {
        message = "Error occurred. Please try again later!";
      });
    }
  }

  void checkGuess() {
    final currentGuess = guess.toLowerCase();
    final correctNameLower = dailyPlayer!['name'].toLowerCase();
    final isCorrectGuess = currentGuess == correctNameLower;

    final updatedGuessesMade = [...guessesMade];
    updatedGuessesMade[currentGuessIndex] = guess;
    setState(() {
      guessesMade = updatedGuessesMade;
    });

    if (isCorrectGuess || currentGuessIndex == 5) {
      setState(() {
        gameEnded = true;
      });
    } else {
      setState(() {
        currentGuessIndex = currentGuessIndex + 1;
        guess = '';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (dailyPlayer == null) return Container();

    final correctName = dailyPlayer!['name'];
    final nationality = dailyPlayer!['nationality'];

    return Scaffold(
      appBar: AppBar(
        title: Text('Daily Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            for (var i = 0; i < guessesMade.length; i++)
              Text('Guess ${i + 1}: ${guessesMade[i]}'),
            if (!gameEnded)
              TextField(
                onChanged: (value) {
                  setState(() {
                    guess = value;
                  });
                },
                onSubmitted: (value) {
                  checkGuess();
                },
                decoration: InputDecoration(
                  labelText: 'Guess ${guessesMade.length + 1}',
                ),
              ),
            if (gameEnded)
              Text(guess.toLowerCase() == correctName.toLowerCase()
                  ? 'You guessed it in ${guessesMade.length} tries'
                  : 'The player was $correctName'),
          ],
        ),
      ),
    );
  }
}
