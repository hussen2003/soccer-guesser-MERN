import 'package:flutter/material.dart';
import 'package:soccerdle/components/dailyGame.dart';
import 'package:soccerdle/components/leaderBoard.dart';
import 'package:soccerdle/components/unlimitedModePage.dart';
import 'package:soccerdle/pages/aboutusPage.dart';
import 'package:soccerdle/pages/homePage.dart';
import 'package:soccerdle/pages/registerPage.dart';
import 'package:soccerdle/pages/loginPage.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegisterPage(),
        '/home': (context) => const HomePage(),
        '/dailyGamePage': (context) => const DailyPage(),
        '/unlimitedModePage': (context) => const UnlimitedModePage(),
        '/leaderBoard': (context) => const LeaderBoardPage(),
        '/aboutUs': (context) => const AboutUsPage(),
      },
    );
  }
}
