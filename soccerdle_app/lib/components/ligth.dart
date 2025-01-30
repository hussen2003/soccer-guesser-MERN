import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LuxDisplayPage extends StatefulWidget {
  static const String routeName = '/luxDisplay';
  const LuxDisplayPage({Key? key}) : super(key: key);

  @override
  _LuxDisplayPageState createState() => _LuxDisplayPageState();
}

class _LuxDisplayPageState extends State<LuxDisplayPage> {
  int lux = 0;
  String message = '';

  final String baseUrl = 'https://sd-group1-7db20f01361c.herokuapp.com';

  @override
  void initState() {
    super.initState();
    fetchLuxData();
  }

  Future<void> fetchLuxData() async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/unlimited/collectlux'),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode({'lux': -1}),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        setState(() {
          lux = data['user']['lux'] ?? 0; // Extracting lux value
          message = ''; // Clear any previous error message
        });
      } else {
        setState(() {
          message = 'Failed to fetch lux data. Please try again.';
        });
      }
    } catch (e) {
      setState(() {
        message = 'Error occurred: ${e.toString()}';
      });
    }
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Lux Data',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          _buildBackgroundImage(), // Background image
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (message.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.8),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      message,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                if (message.isEmpty)
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.8),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          'Lux Value',
                          style: TextStyle(
                            fontSize: 40, // Larger "Lux Value" text
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '$lux',
                          style: const TextStyle(
                            fontSize: 60, // Larger lux number
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 20),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue, // Button background color
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10), // Smaller button
                  ),
                  onPressed: () async {
                    await fetchLuxData();
                  },
                  child: const Text(
                    'Refresh',
                    style: TextStyle(
                      fontSize: 16, // Standard text size for button
                      color: Colors.white, // White text color
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
