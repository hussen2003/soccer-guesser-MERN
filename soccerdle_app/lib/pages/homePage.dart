import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class HomePage extends StatefulWidget {
  static const String routeName = '/homePage';
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        appBar: AppBar(
          backgroundColor: HexColor("#4c8527"),
          elevation: 0,
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              color: Colors.white,
              onPressed: () {
                Navigator.pushReplacementNamed(context, '/login');
              },
            ),
          ],
        ),
        body: homeScreen(context),
      ),
    );
  }

  Widget homeScreen(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 35.0),
          child: Column(
            children: [
              Container(
                width: double.infinity,
                height: 60,
                color: Colors.white,
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      '/dailyGame',
                    );
                  },
                  child: Container(
                    width: double.infinity,
                    height: 60,
                    color: Colors.white,
                    child: const Center(
                      child: Text(
                        'Play Daily Game',
                        style: TextStyle(
                          color: Colors.green,
                          fontWeight: FontWeight.bold,
                          fontSize: 30,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Container(
                width: double.infinity,
                height: 60,
                color: Colors.white,
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      '/unlimitedModePage',
                    );
                  },
                  child: Container(
                    width: double.infinity,
                    height: 60,
                    color: Colors.white,
                    child: const Center(
                      child: Text(
                        'Unlimited Mode',
                        style: TextStyle(
                          color: Colors.green,
                          fontWeight: FontWeight.bold,
                          fontSize: 30,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Container(
                width: double.infinity,
                height: 60,
                color: Colors.white,
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      '/leaderBoard',
                    );
                  },
                  child: Container(
                    width: double.infinity,
                    height: 60,
                    color: Colors.white,
                    child: const Center(
                      child: Text(
                        'LeaderBoard',
                        style: TextStyle(
                          color: Colors.green,
                          fontWeight: FontWeight.bold,
                          fontSize: 30,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
