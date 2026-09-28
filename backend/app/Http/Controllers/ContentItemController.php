<?php

namespace App\Http\Controllers;

use App\Models\ContentItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ContentItemController extends Controller
{
    private const TYPES = ['packages', 'marketing-kits', 'insights', 'tools', 'solution-library', 'viralog'];

    public function index(string $type)
    {
        $this->assertType($type);

        return response()->json(ContentItem::where('type', $type)->latest()->get());
    }

    public function store(Request $request, string $type)
    {
        $this->assertType($type);

        $item = ContentItem::create($this->validated($request, $type));

        return response()->json($item, 201);
    }

    public function show(string $type, ContentItem $contentItem)
    {
        $this->assertItemType($type, $contentItem);

        return response()->json($contentItem);
    }

    public function update(Request $request, string $type, ContentItem $contentItem)
    {
        $this->assertItemType($type, $contentItem);
        $contentItem->update($this->validated($request, $type, $contentItem));

        return response()->json($contentItem->fresh());
    }

    public function destroy(string $type, ContentItem $contentItem)
    {
        $this->assertItemType($type, $contentItem);
        $contentItem->delete();

        return response()->json(['message' => 'Konten dihapus.']);
    }

    private function validated(Request $request, string $type, ?ContentItem $contentItem = null): array
    {
        return $request->validate([
            'slug' => ['required', 'string', 'max:255', Rule::unique('content_items', 'slug')->where('type', $type)->ignore($contentItem?->id)],
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'image_url' => ['nullable', 'url', 'max:2048'],
            'data' => ['nullable', 'array'],
            'is_published' => ['sometimes', 'boolean'],
        ]) + ['type' => $type];
    }

    private function assertType(string $type): void
    {
        abort_unless(in_array($type, self::TYPES, true), 404);
    }

    private function assertItemType(string $type, ContentItem $contentItem): void
    {
        $this->assertType($type);
        abort_unless($contentItem->type === $type, 404);
    }
}
