import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:soccerdle_app/common/customButton.dart';
import 'package:soccerdle_app/common/customTextfiled.dart';
import 'package:soccerdle_app/services/registerPageServices.dart';

class RegisterPage extends StatefulWidget {
  static const String routeName = '/register';
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
 


  String? validateName(String? name) {
    if (name == null || name.isEmpty) {
      return 'Please enter your name';
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return null;
  }

  String? validateUserName(String? username) {
    if (username == null || username.isEmpty) {
      return 'Please enter your username';
    }
    return null;
  }

  String? validateEmail(String? email) {
    if (email == null || email.isEmpty) {
      return 'Please enter your email';
    }
    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  String? validatePassword(String? password) {
    if (password == null || password.isEmpty) {
      return 'Please enter your password';
    }
    if (password.length < 8) {
      return 'Password must be at least'
          ' 8 characters long';
    }
    if (!password.contains(RegExp(r'[A-Z]'))) {
      return 'Add at least'
          ' One uppercase letter';
    }
    if (!password.contains(RegExp(r'[a-z]'))) {
      return 'Add at least'
          ' One lowercase letter';
    }

    return null;
  }

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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(40.0),
        child: AppBar(
          title: Text(
            'Soccerdle',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          backgroundColor: Colors.transparent,
          elevation: 0,
          flexibleSpace: ClipRect(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0),
              child: Container(
                color: Colors.white.withOpacity(0.7),
              ),
            ),
          ),
        ),
      ),
      body: Stack(
        children: [
          // Background image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('lib/images/app.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Content
            SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.only(left: 0, right: 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 0),
                    const SizedBox(height: 80),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: Colors.grey.shade200.withOpacity(0.9),
                              borderRadius: BorderRadius.circular(15),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(0),
                                  spreadRadius: 3,
                                  blurRadius: 5,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                            child: Form(
                              key: _signUpFormKey,
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Text(
                                    'Register',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 30),
                                  CustomTextField(
                                    controller: _nameController,
                                    hintText: 'Full Name',
                                    prefixIcon: const Icon(Icons.person),
                                    obscureText: false,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                    validator: validateName,
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _emailController,
                                    hintText: 'Email',
                                    prefixIcon: const Icon(Icons.email),
                                    obscureText: false,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                    validator: validateEmail,
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _usernameController,
                                    hintText: 'Username',
                                    prefixIcon: const Icon(Icons.person),
                                    obscureText: false,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                    validator: validateUserName,
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _passwordController,
                                    hintText: 'Password',
                                    prefixIcon: const Icon(Icons.lock),
                                    obscureText: true,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                    validator: validatePassword,
                                  ),
                                  const SizedBox(height: 30),
                                  CustomButton(
                                    text: 'Sign Up',
                                    onTap: () {
                                      if (_signUpFormKey.currentState!
                                          .validate()) {
                                        signUpUser();
                                        Navigator.pushNamed(context, '/login');
                                      }
                                    },
                                  ),
                                  const SizedBox(height: 20),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
    );
  }
}
