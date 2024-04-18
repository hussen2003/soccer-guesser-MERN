import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:soccerdle_app/components/allTimeLeaderboard.dart';
import 'package:soccerdle_app/components/dailyGame.dart';
import 'package:soccerdle_app/components/leaderBoard.dart';
import 'package:soccerdle_app/components/unlimitedModePage.dart';
import 'package:soccerdle_app/pages/aboutusPage.dart';
import 'package:soccerdle_app/pages/homePage.dart';
import 'package:soccerdle_app/pages/loginPage.dart';
import 'package:soccerdle_app/pages/registerPage.dart';
import 'package:soccerdle_app/providers/userProvider.dart';

void main() async {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => UserProvider()),
        // Other providers
      ],
      child: MyApp(),
    ),
  );
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
        '/dailyGamePage': (context) => const DailyGamePage(),
        '/unlimitedModePage': (context) => const UnlimitedModePage(),
        '/leaderBoard': (context) => const LeaderBoardPage(),
        '/aboutUs': (context) => const AboutUsPage(),
        '/allTimeLeaderboard': (context) => const AllTimeLeaderBoardPage(),
      },
    );
  }
}
