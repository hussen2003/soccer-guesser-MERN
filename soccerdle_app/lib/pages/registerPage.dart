import 'package:flutter/material.dart';
import 'package:soccerdle/common/customButton.dart';
import 'package:soccerdle/common/customTextfiled.dart';
import 'package:soccerdle/services/registerPageServices.dart';

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
        backgroundColor: Colors.transparent,
        body: Stack(
          children: [
            Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('lib/images/app.jpg'),
                  fit: BoxFit.cover,
                ),
              ),
              width: double.infinity,
              height: double.infinity,
            ),
            SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.only(left: 0, right: 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 0),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      color: Colors.grey.shade200.withOpacity(0.5),
                      width: MediaQuery.of(context).size.width,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.arrow_back),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            color: Colors.black,
                          ),
                          const Text(
                            'Soocerdle',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(width: 52), // Adjust as needed
                        ],
                      ),
                    ),
                    const SizedBox(height: 80),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20), // Adjust padding here independently
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
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _emailController,
                                    hintText: 'Email',
                                    prefixIcon: const Icon(Icons.email),
                                    obscureText: false,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _usernameController,
                                    hintText: 'Username',
                                    prefixIcon: const Icon(Icons.person),
                                    obscureText: false,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                  ),
                                  const SizedBox(height: 20),
                                  CustomTextField(
                                    controller: _passwordController,
                                    hintText: 'Password',
                                    prefixIcon: const Icon(Icons.lock),
                                    obscureText: true,
                                    borderRadius: BorderRadius.circular(10),
                                    fillColor: Colors.white,
                                  ),
                                  const SizedBox(height: 30),
                                  CustomButton(
                                    text: 'Sign Up',
                                    onTap: () {
                                      if (_signUpFormKey.currentState!.validate()) {
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
      ),
    );
  }
}
