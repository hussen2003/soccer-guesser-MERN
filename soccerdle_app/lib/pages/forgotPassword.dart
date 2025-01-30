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
  final ForgotPasswordPageService loginService = ForgotPasswordPageService();
  final TextEditingController _emailController = TextEditingController();
  bool _isObscure = true;

  @override
  void dispose() {
    super.dispose();
    _emailController.dispose();
  }

  void forgotPassword() async {
    // Check if the form is valid before proceeding
    if (_signInFormKey.currentState!.validate()) {
      await loginService.forgotPassword(context: context, email: _emailController.text);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center( 
      child: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            title: Text(
              'G.E.A',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            centerTitle: true,
          ),
          body: Stack(
            children: [
              _buildBackgroundImage(),
              _loginUI(context),
            ],
          ),
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
              borderRadius: BorderRadius.circular(15),
            ),
            child: Form(
              key: _signInFormKey,
              child: Column(
                children: [
                  const Text(
                    "Reset Password",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    "If you have an account with us, you will receive an email to change your password.",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 30),
                  _buildTextField(
                    controller: _emailController,
                    hintText: 'Email',
                    prefixIcon: Icons.email,
                  ),
                  const SizedBox(height: 30),
                  ElevatedButton(
                    onPressed: forgotPassword,
                    child: const Text('Submit'),
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
