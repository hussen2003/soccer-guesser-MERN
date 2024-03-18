import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class UnlimitedModePage extends StatefulWidget {
  static const String routeName = '/unlimitdedModePage';
  const UnlimitedModePage({Key? key}) : super(key: key);

  @override
  _UnlimitedModePageState createState() => _UnlimitedModePageState();
}

class _UnlimitedModePageState extends State<UnlimitedModePage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        body: unlimitedModeScreen(context),
      ),
    );
  }

  Widget unlimitedModeScreen(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Unlimited Mode',
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
