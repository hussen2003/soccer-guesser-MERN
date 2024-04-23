import 'package:flutter/material.dart';
import 'package:soccerdle_app/services/loginPageServices.dart';

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

  void playDaily(BuildContext context) {
    Navigator.pushNamed(context, '/dailyGamePage');
  }

  void goLeaderboard(BuildContext context) {
    Navigator.pushNamed(context, '/leaderBoard');
  }

  void logout() {
    Navigator.pushReplacementNamed(context, '/login');
  }

  void goUnlimited(BuildContext context) {
    Navigator.pushNamed(context, '/unlimitedModePage');
  }

  void goAllTime(BuildContext context) {
    Navigator.pushNamed(context, '/allTimeLeaderboard');
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
        automaticallyImplyLeading: false,
        leading: PopupMenuButton(
          itemBuilder: (BuildContext context) {
            return [
              PopupMenuItem(
                child: Row(
                  children: [
                    Text(
                      'Signed as: ',
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      Storage.getName(),
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
                enabled: false,
              ),
              PopupMenuItem(
                child: Container(
                  padding: EdgeInsets.all(8.0),
                  width: 200,
                  decoration: BoxDecoration(
                    color: Color(0xff7eaf34),
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'Daily',
                    style: TextStyle(
                      color:
                          Colors.black,
                    ),
                  ),
                ),
                value: 'daily',
              ),
              PopupMenuItem(
                child: Container(
                  padding: EdgeInsets.all(8.0),
                  width: 200,
                  decoration: BoxDecoration(
                    color: Color(0xff7eaf34),
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'Unlimited',
                    style: TextStyle(
                      color:
                          Colors.black,
                    ),
                  ),
                ),
                value: 'unlimited',
              ),
              PopupMenuItem(
                child: Container(
                  padding: EdgeInsets.all(8.0),
                  width: 200,
                  decoration: BoxDecoration(
                    color: Color(0xff7eaf34),
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'Leaderboard',
                    style: TextStyle(
                      color:
                          Colors.black,
                    ),
                  ),
                ),
                value: 'dlb',
              ),
              PopupMenuItem(
                child: Container(
                  padding: EdgeInsets.all(8.0),
                  width: 200,
                  decoration: BoxDecoration(
                    color: Color(0xff7eaf34),
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'All time Leaderboard',
                    style: TextStyle(
                      color:
                          Colors.black,
                    ),
                  ),
                ),
                value: 'alltime',
              ),
              PopupMenuItem(
                child: Container(
                  padding: EdgeInsets.all(8.0),
                  width: 200,
                  decoration: BoxDecoration(
                    color: Color(0xff7eaf34),
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'About Us',
                    style: TextStyle(
                      color:
                          Colors.black,
                    ),
                  ),
                ),
                value: 'aboutUs',
              ),
            ];
          },
          onSelected: (value) {
            if (value == 'aboutUs') {
              Navigator.pushNamed(context, '/aboutUs');
            }
            if (value == 'daily') {
              Navigator.pushNamed(context, '/dailyGamePage');
            }
            if (value == 'unlimited') {
              Navigator.pushNamed(context, '/unlimitedModePage');
            }
            if (value == 'dlb') {
              Navigator.pushNamed(context, '/leaderBoard');
            }
            if (value == 'alltime') {
              Navigator.pushNamed(context, '/allTimeLeaderboard');
            }
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
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('lib/images/app.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: [
                  _buildCard(
                      context,
                      'Daily Game',
                      'Every 24 hours a new player will be randomly selected. Can you guess today\'s player?',
                      'lib/images/messi2.jpeg',
                      playDaily,
                      'Play Now'),
                  _buildCard(
                      context,
                      'Unlimited Game',
                      'Test your knowledge and go as many times as you want! How many can you guess?',
                      'lib/images/SUI.jpeg',
                      goUnlimited,
                      'Play Now'),
                  _buildCard(
                      context,
                      'Daily Leaderboard',
                      'Leaderboard for the Daily game mode.',
                      'lib/images/france2.jpeg',
                      goLeaderboard,
                      'Leaderboard'),
                  _buildCard(
                      context,
                      'All Time Leaderboard',
                      'Overall Leaderboard. Do you see yourself on it?',
                      'lib/images/brazil2.jpeg',
                      goAllTime,
                      'All Time'),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCard(BuildContext context, String title, String description,
      String imagePath, Function onPressed, String text) {
    return Container(
      width: 300,
      height: 450,
      margin: EdgeInsets.symmetric(vertical: 8.0),
      child: Card(
        color: Colors.white,
        elevation: 20,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: BorderSide(color: Colors.black, width: 2),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black, width: 1.5),
              ),
              child: Image.asset(
                imagePath,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    description,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 16),
                  OutlinedButton(
                    onPressed: () => onPressed(context),
                    child: Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                      child: Text(
                        text,
                        style: TextStyle(fontSize: 16, color: Colors.black),
                      ),
                    ),
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Color(0xff7eaf34)),
                      side: MaterialStateProperty.all<BorderSide>(
                        BorderSide(color: Colors.black, width: 2),
                      ),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
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
