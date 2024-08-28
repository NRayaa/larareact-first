<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/todo', [UserController::class, 'storeTodo'])->name('storeTodo');
    Route::get('/todo/edit/{id}', [UserController::class, 'editTodo'])->name('editTodo');
    Route::put('/todo/update/{id}', [UserController::class, 'updateTodo'])->name('updateTodo');
    Route::delete('/todo/delete/{id}', [UserController::class, 'deleteTodo'])->name('deleteTodo');
});

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/todo', [UserController::class, 'todo'])->name('users.todo');

require __DIR__.'/auth.php';
