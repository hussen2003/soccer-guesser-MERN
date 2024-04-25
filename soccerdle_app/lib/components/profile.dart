import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:soccerdle_app/services/loginPageServices.dart';

class ProfilePage extends StatefulWidget {
  static const String routeName = '/profile';
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  String message = '';
  String display = Storage.getName();
  String newName = Storage.getName();
  String newUsername = Storage.getUser();
  int score = 0;
  int dailyScore = 0;
  int gamesPlayed = 0;
  int gamesWon = 0;
  int streak = 0;

  @override
  void initState() {
    super.initState();
    fetchUser();
  }

  final String baseUrl = 'http://soccerdle-mern-ace81d4f14ec.herokuapp.com';

  Future<void> fetchUser() async {
    // Fetch user data from the API
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/obtainUser'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'username': Storage.getUser(), // Replace with the actual username
        }),
      );

      if (response.statusCode == 200) {
        final userData = jsonDecode(response.body)['user'];
        setState(() {
          newName = userData['name'];
          newUsername = userData['username'];
          score = userData['score'];
          dailyScore = userData['dailyScore'];
          gamesPlayed = userData['amountGamesPlayed'];
          gamesWon = userData['amountGamesWon'];
          streak = userData['streak'];
        });
      } else {
        setState(() {
          message = 'Failed to fetch user data';
        });
      }
    } catch (e) {
      setState(() {
        message = 'Error: $e';
      });
    }
  }

  Future<void> changeName(String newName) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/updateName'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'newName': newName,
          'username': Storage.getUser(),
        }),
      );

      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['error'] != null) {
          setState(() {
            message = res['error'];
          });
        } else {
          setState(() {
            message = res['message'];
            newName = res['newName'];
            Storage.setName(newName);
            display = newName;
          });
        }
      } else {
        setState(() {
          message = 'Failed to update name';
        });
      }
    } catch (e) {
      setState(() {
        message = 'Internal Server Error: $e';
      });
    }
  }

  Future<void> changeUsername(String newUse) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/updateUsername'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'newUsername': newUse,
          'username': Storage.getUser(),
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final res = jsonDecode(response.body);
        setState(() {
          message = res['message'];
          newUsername = res['newUser'];
          Storage.setUser(newUsername);
        });
      } else {
        setState(() {
          message = 'Failed to update username';
        });
      }
    } catch (e) {
      setState(() {
        message = 'Internal Server Error: $e';
      });
    }
  }

  void logout() {
    Navigator.pushReplacementNamed(context, '/login');
  }

  Future<void> deleteUser() async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/deleteUser'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'username': Storage.getUser(),
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final res = jsonDecode(response.body);
        setState(() {
          message = res['error'];
          logout();
        });
      } else {
        setState(() {
          message = 'Failed to delete account';
        });
      }
    } catch (e) {
      setState(() {
        message = 'Internal Server Error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Hello $display!',
              style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20.0),
            Text(
              'Your Stats:',
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10.0),
            Text('Daily Score: $dailyScore'),
            Text('All Time Score: $score'),
            Text('Games Played: $gamesPlayed'),
            Text('Games Won: $gamesWon'),
            Text('Streak: $streak'),
            SizedBox(height: 20.0),
            Form(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextFormField(
                    initialValue: newName,
                    onChanged: (value) {
                      setState(() {
                        newName = value;
                      });
                    },
                    decoration: InputDecoration(labelText: 'Name'),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      await changeName(newName);
                    },
                    child: Text('Update Name'),
                  ),
                  TextFormField(
                    initialValue: newUsername,
                    onChanged: (value) {
                      setState(() {
                        newUsername = value;
                      });
                    },
                    decoration: InputDecoration(labelText: 'Username'),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      await changeUsername(newUsername);
                    },
                    child: Text('Update Username'),
                  ),
                  SizedBox(height: 20.0),
                  ElevatedButton(
                    onPressed: () {
                      // Show confirmation dialog to delete account
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: Text('Confirm'),
                            content: Text(
                                'Are you sure you want to delete your account?'),
                            actions: [
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context)
                                      .pop(); // Close the dialog
                                },
                                child: Text('Cancel'),
                              ),
                              TextButton(
                                onPressed: () async {
                                  Navigator.of(context)
                                      .pop(); // Close the dialog
                                  await deleteUser(); // Call deleteUser function
                                },
                                child: Text('Delete'),
                              ),
                            ],
                          );
                        },
                      );
                    },
                    style:
                        ElevatedButton.styleFrom(backgroundColor: Colors.red),
                    child: Text('Delete Account'),
                  ),
                  SizedBox(height: 20.0),
                  if (message.isNotEmpty)
                    Text(
                      message,
                      style: TextStyle(color: Colors.red),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
