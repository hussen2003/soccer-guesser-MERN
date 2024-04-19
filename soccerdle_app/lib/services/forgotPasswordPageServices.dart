import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:soccerdle_app/constants/utils.dart';
import 'package:soccerdle_app/providers/userProvider.dart';

class ForgotPasswordPageService {
  Map<String, dynamic>? userData;

  Future<void> forgotPassword({
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
        userData = json.decode(res.body);

        Storage s = new Storage(username, userData?['name']);

        Provider.of<UserProvider>(context, listen: false).setUser(res.body);
        // You may navigate to the next screen upon successful login here.
      } else if (res.statusCode == 401) {
        showSnackBar(context, "Unauthorized access");
      } else if (res.statusCode == 400) {
        // Bad request, likely due to invalid credentials
        showSnackBar(context, "Invalid username or password");
        // Prevent further action (e.g., moving forward to /home)
        return;
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

class Storage {
  static late String use;
  static late String name;

  Storage(String u, String n) {
    use = u;
    name = n;
  }

  static String getUser() {
    return use;
  }

  static String getName() {
    return name;
  }
}
