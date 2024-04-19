import 'package:flutter/material.dart';
import 'package:soccerdle_app/services/loginPageServices.dart';

class ForgotPasswordPage extends StatefulWidget {
  static const String routeName = '/forgot-password';
  const ForgotPasswordPage({Key? key}) : super(key: key);

  @override
  _ForgotPasswordPageState createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _signInFormKey = GlobalKey<FormState>();
  final forogtPasswordPageService forgotPasswordService =
      forogtPasswordPageService();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isObscure = true;

  @override
  void dispose() {
    super.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
  }

  void forogtPassword() async {
    if (_signInFormKey.currentState!.validate()) {
      await forgotPasswordService.forgotPassword(
        context: context,
        username: _usernameController.text,
        password: _passwordController.text,
      );
      if (forgotPasswordService.userData != null) {
        Navigator.pushNamed(context, '/login');
      }
    }
  }

  void navigateToAboutUs() {
    Navigator.pushNamed(context, '/aboutUs');
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Stack(
          children: [
            _buildBackgroundImage(),
            _loginUI(context),
          ],
        ),
      ),
    );
  }

  Widget _buildBackgroundImage() {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('lib/images/app.jpg'),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _loginUI(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 120),
        color: Colors.black.withOpacity(0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.9),
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Form(
                key: _signInFormKey,
                child: Column(
                  children: [
                    const Text(
                      "Forgot Password",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 30,
                        color: Colors.black,
                      ),
                    ),
                    const SizedBox(height: 30),
                    _buildTextField(
                      controller: _usernameController,
                      hintText: 'Username',
                      prefixIcon: Icons.person,
                    ),
                    const SizedBox(height: 20),
                    _buildTextField(
                      controller: _passwordController,
                      hintText: 'Password',
                      prefixIcon: Icons.lock,
                      isPassword: true,
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: forogtPassword,
                      child: const Text('Update Password'),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hintText,
    required IconData prefixIcon,
    bool isPassword = false,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: isPassword ? _isObscure : false,
      decoration: InputDecoration(
        hintText: hintText,
        prefixIcon: Icon(prefixIcon),
        suffixIcon: isPassword
            ? IconButton(
                icon:
                    Icon(_isObscure ? Icons.visibility : Icons.visibility_off),
                onPressed: () {
                  setState(() {
                    _isObscure = !_isObscure;
                  });
                },
              )
            : null,
        filled: true,
        fillColor: Colors.grey.shade200,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
          borderSide: const BorderSide(color: Colors.grey),
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter your $hintText';
        }
        return null;
      },
    );
  }
}
