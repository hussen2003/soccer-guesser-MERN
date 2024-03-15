import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class LeaderBoardPage extends StatefulWidget {
  static const String routeName = '/leaderBoardPage';
  const LeaderBoardPage({Key? key}) : super(key: key);

  @override
  _LeaderBoardPageState createState() => _LeaderBoardPageState();
}

class _LeaderBoardPageState extends State<LeaderBoardPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        body: leaderScreen(context),
      ),
    );
  }

  Widget leaderScreen(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Leader Board',
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
