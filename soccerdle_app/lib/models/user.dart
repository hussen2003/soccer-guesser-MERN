import 'dart:convert';

class User {
  final String id;
  final String name;
  final String email;
  final bool emailVerified;
  final String username;
  final String password;
  final int score;
  final int dailyScore;
  final String dailyDate;
  final String lastDatePlayed;
  final String lastDateFinished;
  final List<int> guessDistribution;
  final int amountGamesPlayed;
  final int amountGamesWon;
  final int streak;
  final List<String> currentGuesses;
  final List<bool> usedHint;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.emailVerified,
    required this.username,
    required this.password,
    required this.score,
    required this.dailyScore,
    required this.dailyDate,
    required this.lastDatePlayed,
    required this.lastDateFinished,
    required this.guessDistribution,
    required this.amountGamesPlayed,
    required this.amountGamesWon,
    required this.streak,
    required this.currentGuesses,
    required this.usedHint
  });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'name': name,
      'email': email,
      'emailVerified': emailVerified,
      'username': username,
      'password': password,
      'score': score,
      'dailyScore': dailyScore,
      'dailyDate': dailyDate,
      'lastDatePlayed': lastDatePlayed,
      'lastDateFinished': lastDateFinished,
      'guessDistribution': guessDistribution,
      'amountGamesPlayed': amountGamesPlayed,
      'amountGamesWon': amountGamesWon,
      'streak': streak,
      'currentGuesses': currentGuesses,
      'usedHint': usedHint,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      emailVerified: map['emailVerified'] ?? false,
      username: map['username'] ?? '',
      password: map['password'] ?? '',
      score: map['score'] ?? 0,
      dailyScore: map['dailyScore'] ?? 0,
      dailyDate: map['dailyDate'] ?? '',
      lastDatePlayed: map['lastDatePlayed'] ?? '',
      lastDateFinished: map['lastDateFinished'] ?? '',
      guessDistribution: List<int>.from(map['guessDistribution'] ?? [0, 0, 0, 0, 0, 0]),
      amountGamesPlayed: map['amountGamesPlayed'] ?? 0,
      amountGamesWon: map['amountGamesWon'] ?? 0,
      streak: map['streak'] ?? 0,
      currentGuesses: List<String>.from(map['currentGuesses'] ?? ["", "", "", "", "", ""]),
      usedHint: List<bool>.from(map['usedHint'] ?? [false, false, false, false, false]),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  User copyWith({
    String? id,
    String? name,
    String? email,
    bool? emailVerified,
    String? username,
    String? password,
    int? score,
    int? dailyScore,
    String? dailyDate,
    String? lastDatePlayed,
    String? lastDateFinished,
    List<int>? guessDistribution,
    int? amountGamesPlayed,
    int? amountGamesWon,
    int? streak,
    List<String>? currentGuesses,
    List<bool>? usedHint,
  }) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      emailVerified: emailVerified ?? this.emailVerified,
      username: username ?? this.username,
      password: password ?? this.password,
      score: score ?? this.score,
      dailyScore: dailyScore ?? this.dailyScore,
      dailyDate: dailyDate ?? this.dailyDate,
      lastDatePlayed: lastDatePlayed ?? this.lastDatePlayed,
      lastDateFinished: lastDateFinished ?? this.lastDateFinished,
      guessDistribution: guessDistribution ?? List.from(this.guessDistribution),
      amountGamesPlayed: amountGamesPlayed ?? this.amountGamesPlayed,
      amountGamesWon: amountGamesWon ?? this.amountGamesWon,
      streak: streak ?? this.streak,
      currentGuesses: currentGuesses ?? List.from(this.currentGuesses),
      usedHint: usedHint ?? List.from(this.usedHint),
    );
  }
}
