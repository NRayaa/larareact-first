<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User', ['status'=>'BERHASIL']);
    }

    public function todo()
    {
        $dataTodo = Todo::orderBy('created_at', 'asc')->paginate(5);
        return Inertia::render('Todo', ['dataTodo' => $dataTodo]);
    }

    public function storeTodo(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
        ], [
            'name.required' => 'Nama todo tidak boleh kosong',
            'name.min' => 'Minimal 3 karakter nama todo',
        ]);

        Todo::create([
            'name' => $data['name'],
        ]);

        return back()->with('message', 'Todo berhasil dibuat');
    }

    public function editTodo(Todo $id){
        // dd($id);
        return Inertia::render('Edit',[
            'todo' => $id
        ]);
    }

    public function updateTodo(Request $request, Todo $id){
        $data = $request->validate([
            'name' => 'required|min:3',
            'is_complete' => 'required',
        ], [
            'name.required' => 'Nama todo tidak boleh kosong',
            'name.min' => 'Minimal 3 karakter nama todo',
        ]);
        $data['is_complete'] = $data['is_complete'] ? 1 : 0;
        $id->update([
            'name' => $data['name'],
            'is_complete' => $data['is_complete'],
        ]);

        return redirect()->route('users.todo')->with('message', 'Todo berhasil diupdate');
    }

    public function deleteTodo(Todo $id){
        $id->delete();
        return back()->with('message', 'Todo berhasil dihapus');
    }
}
