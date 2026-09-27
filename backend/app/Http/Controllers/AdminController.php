<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AdminController extends Controller
{
    public function index() { return response()->json(User::latest()->get(['id','name','email','created_at'])); }
    public function store(Request $request) { $data = $request->validate(['name'=>'required|string|max:255','email'=>'required|email|unique:users,email','password'=>'required|string|min:8']); $user=User::create($data); return response()->json($user->only(['id','name','email','created_at']),201); }
    public function show(User $admin) { return response()->json($admin->only(['id','name','email','created_at'])); }
    public function update(Request $request, User $admin) { $data=$request->validate(['name'=>'sometimes|required|string|max:255','email'=>'sometimes|required|email|unique:users,email,'.$admin->id,'password'=>'nullable|string|min:8']); if (empty($data['password'])) unset($data['password']); $admin->update($data); return response()->json($admin->only(['id','name','email','created_at'])); }
    public function destroy(Request $request, User $admin) { if ($request->user()->id === $admin->id) return response()->json(['message'=>'Tidak dapat menghapus akun yang sedang digunakan.'],422); $admin->delete(); return response()->json(['message'=>'Admin dihapus.']); }
}
