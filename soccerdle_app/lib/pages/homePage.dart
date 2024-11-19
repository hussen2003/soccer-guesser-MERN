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

  void goProfile(BuildContext context) {
    Navigator.pushNamed(context, '/profile');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'G.E.A',
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
              title: Text('Profile'),
              onTap: () {
                Navigator.pop(context);
                goProfile(context);
              },
              shape: RoundedRectangleBorder(
                //side: BorderSide(color: Colors.black, width: 0.5),
                borderRadius: BorderRadius.circular(0),
              ),
            ),
            ListTile(
              title: Text('Analyzer of Blue to Red Light'),
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
              title: Text('Temperature Readings'),
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
              title: Text('Humidity Readings'),
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
              title: Text('CO2 Readings'),
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
                      'Analyzer of Blue to Red Light',
                      'Analyze the spectrum of light in the environment.',
                      'lib/images/light.jpg',
                      playDaily,
                      'Get Readings'),
                  _buildCard(
                      context,
                      'Temperature Readings',
                      'Get temperature data and see daily variations over time.',
                      'lib/images/SUI.jpg',
                      goUnlimited,
                      'Get Readings'),
                  _buildCard(
                      context,
                      'Humidity Readings',
                      'Track humidity levels and stay informed on daily fluctuations.',
                      'lib/images/light.jpg',
                      goLeaderboard,
                      'Get Readings'),
                  _buildCard(
                      context,
                      'CO2 Readings',
                      'Check CO2 levels for a healthy environment and view trends over time.',
                      'lib/images/messi2.jpg',
                      goAllTime,
                      'Get Readings'),
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
