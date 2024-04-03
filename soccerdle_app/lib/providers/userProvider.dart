import 'package:flutter/material.dart';
import 'package:soccerdle/models/user.dart';

class UserProvider extends ChangeNotifier {
  User? _user; // Change to nullable since it can be cleared
  User? get user => _user;

  void setUser(String userData) {
    _user = User.fromJson(userData);
    notifyListeners();
  }

  void clearUser() {
    _user = null;
    notifyListeners();
  }
}
