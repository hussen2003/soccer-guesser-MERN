import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:soccerdle/components/allTimeLeaderboard.dart';
import 'package:soccerdle/components/dailyGame.dart';
import 'package:soccerdle/components/leaderBoard.dart';
import 'package:soccerdle/components/unlimitedModePage.dart';
import 'package:soccerdle/pages/aboutusPage.dart';
import 'package:soccerdle/pages/homePage.dart';
import 'package:soccerdle/pages/loginPage.dart';
import 'package:soccerdle/pages/registerPage.dart';
import 'package:soccerdle/providers/userProvider.dart';

import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
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
