import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class AboutUsPage extends StatefulWidget {
  static const String routeName = '/aboutUsPage';
  const AboutUsPage({Key? key}) : super(key: key);

  @override
  _AboutUsPageState createState() => _AboutUsPageState();
}

class _AboutUsPageState extends State<AboutUsPage> {
  final List<Map<String, dynamic>> teamMembers = [
    {
      'name': 'David Urrego',
      'role': 'Frontend (Web)',
      'image': 'https://cdn.sofifa.net/players/241/721/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/david-urrego-93aa522b8/'
    },
    {
      'name': 'Hussen Premier',
      'role': 'Database',
      'image': 'https://cdn.sofifa.net/players/192/448/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/hussen-premier/'
    },
    {
      'name': 'Jack Gao',
      'role': 'Frontend (Web)/(Mobile)',
      'image': 'https://cdn.sofifa.net/players/232/411/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/jack-gao-376328290'
    },
    {
      'name': 'Luckner Ablard',
      'role': 'Frontend (Mobile)',
      'image': 'https://cdn.sofifa.net/players/206/517/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/luckner-ablard/'
    },
    {
      'name': 'Moses Cohen',
      'role': 'Frontend (Web)',
      'image': 'https://cdn.sofifa.net/players/231/443/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/moses-cohen/'
    },
    {
      'name': 'Patrick Rizkalla',
      'role': 'API',
      'image': 'https://cdn.sofifa.net/players/264/240/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/patrick-rizkalla/'
    },
    {
      'name': 'Raul Graterol',
      'role': 'Frontend (Mobile)',
      'image': 'https://cdn.sofifa.net/players/252/371/24_120.png',
      'linkedin': 'https://www.linkedin.com/in/raul-graterol-509716241'
    },
    {
      'name': 'Ryan Rahrooh',
      'role': 'Project Manager',
      'image': 'https://cdn.sofifa.net/players/010/535/15_120.png',
      'linkedin': 'https://www.linkedin.com/in/ryan-rahrooh'
    },
  ];

  void redirectToLinkedIn(String linkedinUrl) {}

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
                color: Colors.white.withOpacity(0.7), // Adjust opacity here
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
                              color: Colors.white.withOpacity(0.7),//Opacity 
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
                                Image.network(
                                  teamMembers[index]['image'],
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
