import 'package:flutter/material.dart';

class FirebaseSignInButton extends StatelessWidget {
  final String imagePath;

  final VoidCallback onTap;
  const FirebaseSignInButton({
    Key? key,
    required this.imagePath,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => onTap(),
        child: Center(
          child: Container(
              padding: const EdgeInsets.all(25),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(5),
                image: DecorationImage(
                  image: AssetImage(imagePath),
                  fit: BoxFit.cover,
                ),
              )),
        ));
  }
}
