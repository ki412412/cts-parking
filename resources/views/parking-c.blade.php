@extends('layouts/main')

@section('content')

<h1 class="text-3xl font-bold">
    C駐車場
</h1>

<div class="py-8 lg:py-12">
    <canvas id="chart-bubble" width="100%"></canvas>
</div>

<div class="py-8 lg:py-12">
    <canvas id="myChart" width="100%"></canvas>
</div>

<div class="py-8 lg:p-12">
    <table class="border-collapse table-auto w-full text-sm">
        <thead>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">ID</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">ステータス</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">説明</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">スクレイピング時刻</th>
        </thead>
        <tbody class="bg-white dark:bg-slate-800">
            @foreach($parkingC as $c)
            <tr>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ $c->id }}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ $c->status_string }}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ $c->description }}</td>
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ $c->scraped_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

@stop
