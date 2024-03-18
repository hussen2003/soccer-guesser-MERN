import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:soccerdle/common/customButton.dart';
import 'package:soccerdle/common/customTextfiled.dart';
import 'package:soccerdle/common/squareTile.dart';
import 'package:soccerdle/services/loginPageServices.dart';

class LoginPage extends StatefulWidget {
  static const String routeName = '/login_page';
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _signInFormKey = GlobalKey<FormState>();
  final LoginPageService loginService = LoginPageService();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    _nameController.dispose();
    _emailController.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
  }

  void signInUser() {
    loginService.signInUser(
      context: context,
      username: _usernameController.text,
      password: _passwordController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        body: _loginUI(context),
      ),
    );
  }

  Widget _loginUI(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height / 5.2,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.white,
                  Colors.white,
                ],
              ),
              borderRadius: BorderRadius.only(
                bottomRight: Radius.circular(100),
                bottomLeft: Radius.circular(100),
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(left: 20, bottom: 30, top: 50),
            child: Text(
              "Login",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 25,
                color: Colors.white,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            child: Form(
              key: _signInFormKey,
              child: Column(
                children: [
                  CustomTextField(
                    controller: _usernameController,
                    hintText: 'Username',
                    prefixIcon: const Icon(Icons.person),
                    obscureText: false,
                  ),
                  const SizedBox(height: 10),
                  CustomTextField(
                    controller: _passwordController,
                    hintText: 'Password',
                    prefixIcon: const Icon(Icons.lock),
                    obscureText: true,
                  ),
                  const SizedBox(height: 10),
                  Align(
                    alignment: AlignmentDirectional.bottomEnd,
                    child: Padding(
                      padding: const EdgeInsets.only(
                        right: 35,
                      ),
                      child: RichText(
                        text: TextSpan(
                          style: const TextStyle(
                              color: Colors.grey, fontSize: 14.0),
                          children: <TextSpan>[
                            TextSpan(
                              text: 'Forget Password ?',
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              recognizer: TapGestureRecognizer()..onTap = () {},
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  CustomButton(
                    text: 'Sign In',
                    onTap: () {
                      if (_signInFormKey.currentState!.validate()) {
                        signInUser();
                        Navigator.pushNamed(
                          context,
                          '/home',
                        );
                      }
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 25.0),
                    child: Row(
                      children: [
                        Expanded(
                          child: Divider(
                            thickness: 0.5,
                            color: Colors.grey[400],
                          ),
                        ),
                        const SizedBox(height: 80),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 25.0),
                          child: Text(
                            'Or Sign In with',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                        Expanded(
                          child: Divider(
                            thickness: 0.5,
                            color: Colors.grey[400],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 1),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SquareTile(imagePath: 'lib/images/google_logo.png'),
                      SizedBox(width: 25),
                      SquareTile(imagePath: 'lib/images/apple_logo.png'),
                      SizedBox(width: 25),
                      SquareTile(imagePath: 'lib/images/instagram_logo.png'),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Align(
            alignment: Alignment.center,
            child: Padding(
              padding: const EdgeInsets.only(
                right: 5,
              ),
              child: RichText(
                text: TextSpan(
                  style: const TextStyle(color: Colors.white, fontSize: 14.0),
                  children: <TextSpan>[
                    const TextSpan(
                      text: "Don't have an account? ",
                    ),
                    TextSpan(
                      text: 'Sign up',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          Navigator.pushNamed(
                            context,
                            '/register',
                          );
                        },
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
