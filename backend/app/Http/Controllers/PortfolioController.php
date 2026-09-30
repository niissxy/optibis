<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json(Portfolio::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $this->normalizeInputs($request);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'client' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:50',
            'ringkasan' => 'nullable|string',
            'description' => 'required|string',
            'hasil' => 'nullable|string',
            'featured' => 'nullable|boolean',
            'website_url' => 'nullable|string|max:500',
            'thumbnail_url' => 'nullable|string|max:2048',
            'pilar' => 'nullable|array',
            'pilar.*' => 'string|max:100',
            'products' => 'nullable|array',
            'products.*' => 'string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'galeri' => 'nullable|array',
            'stats' => 'nullable|array',
            'process' => 'nullable|array',
            'documents' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
        ]);

        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['name']);
        $data['client'] = $data['client'] ?? $data['name'];
        $data['industry'] = $data['industry'] ?? $data['category'];
        $data['ringkasan'] = $data['ringkasan'] ?? Str::limit(strip_tags($data['description']), 160);
        $data['pilar'] = $data['pilar'] ?? ['Website'];
        $data['products'] = $data['products'] ?? [];
        $data['website_url'] = $data['website_url'] ?? '#';
        $data['featured'] = $request->boolean('featured', false);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('portfolios', 'public');
        }

        unset($data['image']);
        $portfolio = Portfolio::create($data);

        return response()->json($portfolio, 201);
    }

    public function show($identifier)
    {
        $portfolio = Portfolio::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$portfolio) {
            abort(404, 'Portofolio tidak ditemukan.');
        }

        return response()->json($portfolio);
    }

    public function update(Request $request, $identifier)
    {
        $portfolio = Portfolio::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$portfolio) {
            abort(404, 'Portofolio tidak ditemukan.');
        }

        $this->normalizeInputs($request);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'client' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'category' => 'sometimes|required|string|max:100',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:50',
            'ringkasan' => 'nullable|string',
            'description' => 'sometimes|required|string',
            'hasil' => 'nullable|string',
            'featured' => 'nullable|boolean',
            'website_url' => 'nullable|string|max:500',
            'thumbnail_url' => 'nullable|string|max:2048',
            'pilar' => 'nullable|array',
            'pilar.*' => 'string|max:100',
            'products' => 'nullable|array',
            'products.*' => 'string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'galeri' => 'nullable|array',
            'stats' => 'nullable|array',
            'process' => 'nullable|array',
            'documents' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
        ]);

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        } elseif (isset($data['slug'])) {
            $data['slug'] = Str::slug($data['slug']);
        }

        if ($request->has('featured')) {
            $data['featured'] = $request->boolean('featured');
        }

        if ($request->hasFile('image')) {
            if ($portfolio->image_path) {
                Storage::disk('public')->delete($portfolio->image_path);
            }
            $data['image_path'] = $request->file('image')->store('portfolios', 'public');
        }

        unset($data['image']);
        $portfolio->update($data);

        return response()->json($portfolio->fresh());
    }

    public function destroy($identifier)
    {
        $portfolio = Portfolio::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$portfolio) {
            return response()->json(['message' => 'Portofolio tidak ditemukan atau sudah dihapus.'], 404);
        }

        if ($portfolio->image_path) {
            Storage::disk('public')->delete($portfolio->image_path);
        }

        $portfolio->delete();

        return response()->json(['message' => 'Portofolio berhasil dihapus.']);
    }

    private function normalizeInputs(Request $request): void
    {
        // Normalize comma-separated or JSON fields
        foreach (['pilar', 'products', 'tags', 'galeri'] as $field) {
            $val = $request->input($field);
            if (is_string($val)) {
                $decoded = json_decode($val, true);
                if (is_array($decoded)) {
                    $request->merge([$field => $decoded]);
                } else {
                    $request->merge([
                        $field => array_values(array_filter(array_map('trim', explode(',', $val))))
                    ]);
                }
            }
        }

        // Normalize structured JSON fields (stats, process, documents)
        foreach (['stats', 'process', 'documents'] as $field) {
            $val = $request->input($field);
            if (is_string($val)) {
                $decoded = json_decode($val, true);
                if (is_array($decoded)) {
                    $request->merge([$field => $decoded]);
                }
            }
        }
    }
}
