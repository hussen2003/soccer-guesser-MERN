import 'package:flutter/material.dart';
import 'package:soccerdle/models/user.dart';

class UserProvider extends ChangeNotifier {
  late User _user; // Change to late variable since it's initialized in setUser
  User get user => _user;

  void setUser(String userData) {
    _user = User.fromJson(userData);
    notifyListeners();
  }
}
