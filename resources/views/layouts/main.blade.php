<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <meta name="api-base-url" content="{{ url('') }}" />
    <script defer src="{{ mix('js/bootstrap.js') }}"></script>
    <script defer src="{{ mix('js/chart-one-day.js') }}"></script>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    @include('layouts/header')
    
    <div class="p-8">
        @yield('content')
    </div>
    
</body>
</html>
