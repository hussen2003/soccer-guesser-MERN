import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soccerdle/constants/utils.dart';
import 'package:soccerdle/providers/userProvider.dart';

class LoginPageService {
  Map<String, dynamic>? userData;

  Future<void> signInUser({
    required BuildContext context,
    required String username,
    required String password,
  }) async {
    try {
      final http.Response res = await http.post(
        Uri.parse(
            'http://soccerdle-mern-ace81d4f14ec.herokuapp.com/api/auth/login'),
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        print('Received status code: ${res.statusCode}');

        userData = json.decode(res.body);
        print('Received User Data: $userData');

        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('x-auth-token', userData!['token']);
        await prefs.setString('username', username); // Save username

        Provider.of<UserProvider>(context, listen: false).setUser(res.body);
        // You may navigate to the next screen upon successful login here.
      } else if (res.statusCode == 401) {
        showSnackBar(context, "Unauthorized access");
      } else if (res.statusCode == 400) {
        // Bad request, likely due to invalid credentials
        showSnackBar(context, "Invalid username or password");
      } else {
        // Other server-side errors
        showSnackBar(context, "Server error: ${res.statusCode}");
      }
    } on SocketException {
      showSnackBar(context, "No internet connection");
    } catch (e) {
      // Handle any other unexpected errors
      showSnackBar(context, "Unexpected error: $e");
    }
  }
}
