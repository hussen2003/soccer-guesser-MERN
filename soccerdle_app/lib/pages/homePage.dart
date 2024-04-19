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
              child: Container(
                padding: EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                  color: Color(0xff7eaf34), // Set green color
                  border: Border.all(color: Colors.black, width: 2.0),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Text(
                  'About Us',
                  style: TextStyle(
                    color: Colors.black, // Set text color to black for contrast
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
                  ),
                  _buildCard(
                    context,
                    'Unlimited Game',
                    'Test your knowledge and go as many times as you want! How many can you guess?',
                    'lib/images/SUI.jpeg',
                    goUnlimited,
                  ),
                  _buildCard(
                    context,
                    'Daily Leaderboard',
                    'Leaderboard for the Daily game mode.',
                    'lib/images/france2.jpeg',
                    goLeaderboard,
                  ),
                  _buildCard(
                    context,
                    'All Time Leaderboard',
                    'Overall Leaderboard. Do you see yourself on it?',
                    'lib/images/brazil2.jpeg',
                    goAllTime,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

Widget _buildCard(BuildContext context, String title, String description,
      String imagePath, Function onPressed) {
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
                      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                      child: Text(
                        'Play now',
                        style: TextStyle(fontSize: 16, color: Colors.black),
                      ),
                    ),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Color(0xff7eaf34)), 
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



