import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:soccerdle/services/loginPageServices.dart';

class HomePage extends StatefulWidget {
  static const String routeName = '/homePage';
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late String name = '';

  @override
  void initState() {
    super.initState();
    // Fetch the saved name from SharedPreferences
    _loadName();
  }

  // Function to load the name from SharedPreferences
  _loadName() async {
    setState(() {
      name = Storage.getName();
    });
  }

  void playDailyGame() {
    Navigator.pushNamed(context, '/dailyGamePage');
  }

  void goToUnlimitedMode() {
    Navigator.pushNamed(context, '/unlimitedModePage');
  }

  void goToLeaderboard() {
    Navigator.pushNamed(context, '/leaderBoard');
  }

  void logout() async {
    GoogleSignIn _googleSignIn = GoogleSignIn();
    await _googleSignIn.signOut();
    Navigator.pushNamed(context, '/login');
  }

  void allTimeLB() async {
    Navigator.pushNamed(context, '/allTimeLeaderboard');
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        extendBodyBehindAppBar: true,
        appBar: AppBar(
          title: const Text('Soccerdle',
              style: TextStyle(fontWeight: FontWeight.bold)),
          centerTitle: true,
          backgroundColor: Colors.grey.shade200.withOpacity(0.5),
          elevation: 0,
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              color: Color.fromARGB(255, 157, 21, 21),
              onPressed: logout,
            ),
          ],
        ),
        body: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('lib/images/app.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Center(
            child: Container(
              padding: const EdgeInsets.all(60),
              decoration: BoxDecoration(
                color: Colors.grey.shade200.withOpacity(0.9),
                borderRadius: BorderRadius.circular(25),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.1),
                    spreadRadius: 5,
                    blurRadius: 10,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Hello ${name.split(' ').first}!',
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 45),
                  ElevatedButton(
                    onPressed: playDailyGame,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                      backgroundColor: Color.fromARGB(255, 84, 227, 110),
                      padding: const EdgeInsets.symmetric(
                          vertical: 30, horizontal: 30),
                    ),
                    child: const Text(
                      'Play Daily Game',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: goToUnlimitedMode,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                      backgroundColor: Color.fromARGB(255, 84, 227, 110),
                      padding: const EdgeInsets.symmetric(
                          vertical: 30, horizontal: 30),
                    ),
                    child: const Text(
                      'Unlimited Mode',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: goToLeaderboard,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                      backgroundColor: Color.fromARGB(255, 84, 227, 110),
                      padding: const EdgeInsets.symmetric(
                          vertical: 30, horizontal: 45),
                    ),
                    child: const Text(
                      'Leaderboard',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: allTimeLB,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                      backgroundColor: Color.fromARGB(255, 84, 227, 110),
                      padding: const EdgeInsets.symmetric(
                          vertical: 15, horizontal: 45),
                    ),
                    child: const Text(
                      '   All Time\nLeaderboard',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
