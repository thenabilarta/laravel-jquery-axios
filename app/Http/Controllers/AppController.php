<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use CURLFile;

class AppController extends Controller
{
  public function data(Request $request)
  {
    $file = $request->file('file');

    $file_name = $file->getClientOriginalName();
    $file_ext = $file->getClientOriginalExtension();
    $file_path = $file->getRealPath();

    $curl_file =  new CURLFile($file_path, $file_ext, $file_name);
    $post_data = array(
      'files' => $curl_file,
      'name' => $file_name
    );

    $target_url = "http://192.168.1.2/xibo-cms/web/api/library";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $target_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content_Type: application/json',
      'Authorization: Bearer ' . 'CX0cQ5rJzPr1hfc356uLQ91Rpn8aXTt7xtVbBt0f',
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    $response = curl_exec($ch);
    curl_close($ch);

    $contents = $response;
    $content = json_decode($contents, true);

    if (isset($content["files"][0]["error"])) {
      return response()->json(["status" => "failed"]);
    }

    return response()->json(["status" => "ok"]);
  }
}
