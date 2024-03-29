import 'dart:convert';
import 'package:network_info_plus/network_info_plus.dart';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soccerdle/constants/errorHandling.dart';
import 'package:soccerdle/constants/utils.dart';
import 'package:soccerdle/providers/user_provider.dart';

class LoginPageService {
  // sign in user
  void signInUser({
    required BuildContext context,
    required String username,
    required String password,
  }) async {
    try {
      String? wifiIP = await NetworkInfo().getWifiIP();
      http.Response res = await http.post(
        Uri.parse('http://$wifiIP:5001/api/auth/login'),
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          Provider.of<UserProvider>(context, listen: false).setUser(res.body);
          await prefs.setString('x-auth-token', jsonDecode(res.body)['token']);
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
