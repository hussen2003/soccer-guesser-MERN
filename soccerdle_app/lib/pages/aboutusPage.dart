import 'dart:ui';
import 'package:flutter/material.dart';

class AboutUsPage extends StatefulWidget {
  static const String routeName = '/aboutUsPage';
  const AboutUsPage({Key? key}) : super(key: key);

  @override
  _AboutUsPageState createState() => _AboutUsPageState();
}

class _AboutUsPageState extends State<AboutUsPage> {
  final List<Map<String, dynamic>> teamMembers = [
    {
      'name': 'Maya Sosa',
      'role': 'PSE',
      'image': 'lib/images/user.png', // Updated to use local image
      'linkedin': 'https://www.linkedin.com',
    },
    {
      'name': 'Paul Weiner',
      'role': 'PSE',
      'image': 'lib/images/user.png', // Updated to use local image
      'linkedin': 'https://www.linkedin.com',
    },
    {
      'name': 'Raul Graterol Medina',
      'role': 'CPE',
      'image': 'lib/images/user.png', // Updated to use local image
      'linkedin': 'https://www.linkedin.com',
    },
    {
      'name': 'Leiner Suarez Colome',
      'role': 'EE',
      'image': 'lib/images/user.png', // Updated to use local image
      'linkedin': 'https://www.linkedin.com',
    },
  ];

  void redirectToLinkedIn(String linkedinUrl) {
    // Define your redirection logic here
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(40.0),
        child: AppBar(
          title: const Text(
            'G.E.A',
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
          Center(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: ListView.builder(
                      itemCount: teamMembers.length,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () =>
                              redirectToLinkedIn(teamMembers[index]['linkedin']),
                          child: Container(
                            margin: const EdgeInsets.symmetric(vertical: 10),
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.7), // Opacity
                              border: Border.all(
                                color: Colors.black,
                                width: 2,
                              ),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  teamMembers[index]['name'],
                                  style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  teamMembers[index]['role'],
                                  style: const TextStyle(
                                      fontSize: 16,
                                      color: Color.fromARGB(255, 86, 85, 85)),
                                ),
                                const SizedBox(height: 10),
                                Image.asset(
                                  teamMembers[index]['image'], // Use local image
                                  width: 120,
                                  height: 120,
                                ),
                              ],
                            ),
                          ),
                        );
                      },
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
