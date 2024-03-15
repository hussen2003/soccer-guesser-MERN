import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class DailyGamePage extends StatefulWidget {
  static const String routeName = '/dailGamePage';
  const DailyGamePage({Key? key}) : super(key: key);

  @override
  _DailyGamePageState createState() => _DailyGamePageState();
}

class _DailyGamePageState extends State<DailyGamePage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        body: dailyGameScreen(context),
      ),
    );
  }

  Widget dailyGameScreen(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Daily Game',
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}
