import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class HomePage extends StatefulWidget {
  static const String routeName = '/homePage';
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // need actual name idk
  String? _name;

  void playDailyGame() {
    Navigator.pushNamed(context, '/dailyGamePage');
  }

  void goToUnlimitedMode() {
    Navigator.pushNamed(context, '/unlimitedModePage');
  }

  void goToLeaderboard() {
    Navigator.pushNamed(context, '/leaderBoard');
  }

  void logout() {
    Navigator.pushNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        extendBodyBehindAppBar:
            true, 
        appBar: AppBar(
          title: const Text('Soccerdle',
              style: TextStyle(fontWeight: FontWeight.bold)),
          centerTitle: true, // This centers the title
          backgroundColor:
              Colors.grey.shade200.withOpacity(0.5), // Make AppBar translucent
          elevation: 0,
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              color: Colors.black,
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
                    'Hello, $_name!',
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 60),
                  ElevatedButton(
                    onPressed: playDailyGame,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[100],
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
                      backgroundColor: Colors.grey[100],
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
                      backgroundColor: Colors.grey[100],
                      padding: const EdgeInsets.symmetric(
                          vertical: 30, horizontal: 30),
                    ),
                    child: const Text(
                      'Leaderboard',
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
