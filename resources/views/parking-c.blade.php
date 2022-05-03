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
    
</head>
<body>
    <h1>C駐車場</h1>
    
    <canvas id="myChart" width="100%"></canvas>

    <div>
        <table>
            <thead>
                <th>ID</th>
                <th>ステータス</th>
                <th>説明</th>
                <th>スクレイピング時刻</th>
            </thead>
            @foreach($parkingC as $c)
                <tr>
                    <td>{{ $c->id }}</td>
                    <td>{{ $c->status_string }}</td>
                    <td>{{ $c->description }}</td>
                    <td>{{ $c->scraped_at }}</td>
                </tr>
            @endforeach
        </table>
    </div>
</body>
</html>