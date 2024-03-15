import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:soccerdle/common/customButton.dart';
import 'package:soccerdle/common/customTextfiled.dart';
import 'package:soccerdle/services/registerPageServices.dart';

class RegisterPage extends StatefulWidget {
  static const String routeName = '/register_page';
  const RegisterPage({Key? key}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _signUpFormKey = GlobalKey<FormState>();
  final RegisterPageService registerService = RegisterPageService();
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

  void signUpUser() {
    registerService.signUpUser(
      context: context,
      name: _nameController.text,
      email: _emailController.text,
      username: _usernameController.text,
      password: _passwordController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#4c8527"),
        body: _registerUI(context),
      ),
    );
  }

  Widget _registerUI(BuildContext context) {
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
              "Register",
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
              key: _signUpFormKey,
              child: Column(
                children: [
                  CustomTextField(
                    controller: _nameController,
                    hintText: 'Full Name',
                    prefixIcon: const Icon(Icons.person),
                    obscureText: false,
                  ),
                  const SizedBox(height: 10),
                  CustomTextField(
                    controller: _emailController,
                    hintText: 'Email',
                    prefixIcon: const Icon(Icons.email),
                    obscureText: false,
                  ),
                  const SizedBox(height: 10),
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
                  CustomButton(
                    text: 'Sign Up',
                    onTap: () {
                      if (_signUpFormKey.currentState!.validate()) {
                        signUpUser();
                        Navigator.pushNamed(context, '/login');
                      }
                    },
                  ),
                  const SizedBox(height: 1),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
