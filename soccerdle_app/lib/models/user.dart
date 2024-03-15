import 'dart:convert';

class User {
  final String id;
  final String name;
  final String email;
  final String password;
  final String username;
  final String type;
  final String token;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.username,
    required this.password,
    required this.type,
    required this.token,
  });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'name': name,
      'email': email,
      'username': username,
      'password': password,
      'type': type,
      'token': token,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      username: map['username'] ?? '',
      password: map['password'] ?? '',
      type: map['type'] ?? '',
      token: map['token'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  User copyWith({
    String? id,
    String? name,
    String? email,
    String? username,
    String? password,
    String? type,
    String? token,
  }) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      username: username ?? this.username,
      password: password ?? this.password,
      type: type ?? this.type,
      token: token ?? this.token,
    );
  }
}
