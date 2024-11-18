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

  

  final String baseUrl = 'https://sd-group1-7db20f01361c.herokuapp.com/';

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
      } else if(response.statusCode == 400){
        setState(() {
          message = 'Username already existed';
        });
      } else{
        setState(() {
          message = 'Failed to update Username!';
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



  void playDaily(BuildContext context) {
    Navigator.pushNamed(context, '/dailyGamePage');
  }

  void goLeaderboard(BuildContext context) {
    Navigator.pushNamed(context, '/leaderBoard');
  }

  void goUnlimited(BuildContext context) {
    Navigator.pushNamed(context, '/unlimitedModePage');
  }

  void goAllTime(BuildContext context) {
    Navigator.pushNamed(context, '/allTimeLeaderboard');
  }

  void goHome(BuildContext context) {
    Navigator.pushNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text(
            'Soccerdle',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          backgroundColor: Colors.grey.shade200.withOpacity(0.5),
          elevation: 0,
          leading: Builder(
            builder: (BuildContext context) {
              return IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              );
            },
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              color: Color.fromARGB(255, 157, 21, 21),
              onPressed: logout,
            ),
          ],
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: <Widget>[
              Container(
                color: Color(0xff7eaf34),
                height: 120, // Adjust the height as needed
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 16),
                      child: Text(
                        'Signed as:',
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 16),
                      child: Text(
                        Storage.getName(),
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              ListTile(
                title: Text('Home Page'),
                onTap: () {
                  Navigator.pop(context);
                  goHome(context);
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 0.5),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              ListTile(
                title: Text('Daily'),
                onTap: () {
                  Navigator.pop(context);
                  playDaily(context);
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 1),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              ListTile(
                title: Text('Unlimited'),
                onTap: () {
                  Navigator.pop(context);
                  goUnlimited(context);
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 0.5),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              ListTile(
                title: Text('Leaderboard'),
                onTap: () {
                  Navigator.pop(context);
                  goLeaderboard(context);
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 1),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              ListTile(
                title: Text('All time Leaderboard'),
                onTap: () {
                  Navigator.pop(context);
                  goAllTime(context);
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 0.5),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              ListTile(
                title: Text('About Us'),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.pushNamed(context, '/aboutUs');
                },
                shape: RoundedRectangleBorder(
                  //side: BorderSide(color: Colors.black, width: 1),
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
            ],
          ),
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
              Text('Daily Games Played: $gamesPlayed'),
              Text('Daily Games Won: $gamesWon'),
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
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(Color(0xff7eaf34)),
                        side: MaterialStateProperty.all<BorderSide>(
                          BorderSide(color: Colors.black, width: 1),
                        ),
                        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                    ),
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
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Color(0xff7eaf34)),
                      side: MaterialStateProperty.all<BorderSide>(
                        BorderSide(color: Colors.black, width: 1),
                      ),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                    ),
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
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
                        side: MaterialStateProperty.all<BorderSide>(
                          BorderSide(color: Colors.black, width: 1),
                        ),
                        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                      ),
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
