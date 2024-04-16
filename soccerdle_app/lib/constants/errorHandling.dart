import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:soccerdle_app/constants/utils.dart';

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  final responseBody = jsonDecode(response.body);
  final errorMessage = responseBody['error'] ?? 'An unexpected error occurred.';

  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 201:
    case 400:
    case 500:
      showSnackBar(context, errorMessage);
      break;
    case 403:
      showSnackBar(context,
          "Forbidden: You don't have permission to access this resource.");
      break;
    case 404:
      showSnackBar(
          context, "Not Found: The requested resource could not be found.");
      break;
    default:
      showSnackBar(context, errorMessage);
  }
}
