import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:soccerdle/constants/errorHandling.dart';
import 'package:soccerdle/constants/utils.dart';
import 'package:soccerdle/models/user.dart';

class RegisterPageService {
  // sign up user
  void signUpUser({
    required BuildContext context,
    required String name,
    required String email,
    required String username,
    required String password
  }) async {
    try {
      User user = User(
        id: '', // Pass default or empty value for id
        name: name,
        email: email,
        emailVerified: false, // Set emailVerified to false
        username: username,
        password: password,
        score: 0, // Set score to 0
        dailyScore: 0, // Set dailyScore to 0
        dailyDate: '', // Pass default or empty value for dailyDate
        lastDatePlayed: '', // Pass default or empty value for lastDatePlayed
        lastDateFinished: '', // Pass default or empty value for lastDateFinished
        guessDistribution: [0, 0, 0, 0, 0, 0], // Provide default values for guessDistribution
        amountGamesPlayed: 0, // Set amountGamesPlayed to 0
        amountGamesWon: 0, // Set amountGamesWon to 0
        streak: 0, // Set streak to 0
        currentGuesses: ["", "", "", "", "", ""], // Provide default values for currentGuesses
        usedHint: [false, false, false, false, false], // Provide default values for usedHint
      );

      http.Response res = await http.post(
        Uri.parse('http://192.168.1.247:5001/api/auth/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(
            context,
            'Account created! Login with the same credentials!',
          );
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
