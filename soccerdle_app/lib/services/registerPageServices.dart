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
    required String password,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        email: email,
        password: password,
        username: username,
        type: '',
        token: '',
      );

      http.Response res = await http.post(
        Uri.parse('http://192.168.56.1:5001/api/auth/signup'),
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
