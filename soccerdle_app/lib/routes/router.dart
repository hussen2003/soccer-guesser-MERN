import 'package:flutter/material.dart';
import 'package:soccerdle/pages/loginPage.dart';
import 'package:soccerdle/pages/registerPage.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case LoginPage.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const LoginPage(),
      );

    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(
            child: Text('ERROR 404'),
          ),
        ),
      );
  }
}
