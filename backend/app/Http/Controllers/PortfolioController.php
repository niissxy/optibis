<?php
namespace App\Http\Controllers;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class PortfolioController extends Controller
{
    public function index() { return response()->json(Portfolio::latest()->get()); }
    public function store(Request $request)
    {
        $data = $request->validate(['name'=>'required|string|max:255','category'=>'required|string|max:100','description'=>'required|string','website_url'=>'required|url|max:500','image'=>'nullable|image|max:5120']);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('portfolios', 'public');
        unset($data['image']);
        return response()->json(Portfolio::create($data), 201);
    }
    public function show(Portfolio $portfolio) { return response()->json($portfolio); }
    public function update(Request $request, Portfolio $portfolio)
    {
        $data = $request->validate(['name'=>'sometimes|required|string|max:255','category'=>'sometimes|required|string|max:100','description'=>'sometimes|required|string','website_url'=>'sometimes|required|url|max:500','image'=>'nullable|image|max:5120']);
        if ($request->hasFile('image')) { if ($portfolio->image_path) Storage::disk('public')->delete($portfolio->image_path); $data['image_path'] = $request->file('image')->store('portfolios', 'public'); }
        unset($data['image']); $portfolio->update($data); return response()->json($portfolio->fresh());
    }
    public function destroy(Portfolio $portfolio) { if ($portfolio->image_path) Storage::disk('public')->delete($portfolio->image_path); $portfolio->delete(); return response()->json(['message'=>'Portofolio dihapus.']); }
}
