package com.devgym.backend.springmvc.demo;

import org.springframework.stereotype.Component;

import java.util.*;

/**
 * mvc-15: Java Collections — Big-O trade-offs reference.
 *
 * TODO: Read through each section, understand the trade-offs,
 * then write a method for each collection that demonstrates its ideal use case.
 *
 * This is a reference/demo class — not a real service.
 */
@Component
public class CollectionsDemo {

    // ─────────────────────────────────────────────────────────────────────────
    // LIST implementations
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * ArrayList: backed by a resizable array.
     *   get(i)    → O(1)   ✓ fast random access
     *   add(end)  → O(1) amortized (resize copies)
     *   add(mid)  → O(n)   ✗ shifts elements
     *   remove    → O(n)   ✗ shifts elements
     *
     * USE WHEN: You need fast indexed reads and mostly append.
     * AVOID WHEN: Frequent insertions/deletions in the middle.
     */
    public void arrayListDemo() {
        List<String> list = new ArrayList<>();
        list.add("a");          // O(1)
        list.get(0);            // O(1) ← key advantage
        list.add(0, "z");       // O(n) ← shifts everything
        // TODO: Add more operations and time them
    }

    /**
     * LinkedList: doubly-linked list, also implements Deque.
     *   get(i)        → O(n)   ✗ traverses from head/tail
     *   add(head/tail)→ O(1)   ✓ pointer update only
     *   remove(head/tail)→O(1) ✓ pointer update only
     *
     * USE WHEN: Used as a queue/deque with frequent head/tail ops.
     * AVOID WHEN: You need fast random access — use ArrayList instead.
     * NOTE: In practice ArrayList beats LinkedList for most workloads due to cache locality.
     */
    public void linkedListDemo() {
        LinkedList<String> queue = new LinkedList<>();
        queue.addFirst("a");    // O(1) ← queue push
        queue.pollLast();       // O(1) ← queue pop
        queue.get(5);           // O(n) ← don't do this
        // TODO: Benchmark ArrayList vs LinkedList for your use case
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MAP implementations
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * HashMap: hash table, O(1) average for get/put/remove.
     *   get/put/remove → O(1) avg, O(n) worst (hash collisions)
     *   Iteration order: undefined (changes between JVM runs)
     *   Allows one null key, multiple null values.
     *
     * USE WHEN: Fast key-based lookup, order doesn't matter.
     * Java 8+: linked list buckets upgrade to balanced tree at 8 entries → true O(log n) worst case.
     */
    public void hashMapDemo() {
        Map<String, Integer> map = new HashMap<>();
        map.put("key", 1);      // O(1)
        map.get("key");         // O(1)
        // TODO: Demonstrate collision scenario with bad hashCode
    }

    /**
     * TreeMap: Red-Black tree, keys always sorted.
     *   get/put/remove → O(log n)  ✗ slower than HashMap
     *   firstKey/lastKey/subMap → O(log n) ✓ unique advantage
     *   Iteration order: natural/comparator order guaranteed
     *
     * USE WHEN: You need sorted keys or range queries (subMap, headMap, tailMap).
     * AVOID WHEN: Order doesn't matter — pay O(log n) for nothing.
     */
    public void treeMapDemo() {
        TreeMap<String, Integer> sorted = new TreeMap<>();
        sorted.put("banana", 2);
        sorted.put("apple", 1);
        sorted.put("cherry", 3);
        sorted.firstKey();                          // O(log n) → "apple"
        sorted.subMap("apple", "cherry");           // O(log n) → range query
        // TODO: Use TreeMap to build a leaderboard sorted by score
    }

    /**
     * LinkedHashMap: HashMap + doubly-linked list to maintain insertion order.
     *   get/put/remove → O(1) (hash table)
     *   Iteration order: insertion order (or access order if constructed with accessOrder=true)
     *
     * USE WHEN: You need HashMap speed but predictable iteration order.
     * USE WITH: accessOrder=true → makes it an LRU cache foundation.
     */
    public void linkedHashMapDemo() {
        // LRU cache: evict eldest when size > 100
        Map<String, String> lruCache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                return size() > 100;
            }
        };
        // TODO: Use this pattern for a simple in-memory cache
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SET implementations
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * HashSet: backed by HashMap, unique elements, no order.
     *   add/contains/remove → O(1) avg
     *
     * USE WHEN: Membership tests, deduplication, no order needed.
     */
    public void hashSetDemo() {
        Set<String> visited = new HashSet<>();
        visited.add("url1");
        boolean seen = visited.contains("url1"); // O(1)
        // TODO: Use HashSet to find duplicates in a list
    }

    /**
     * LinkedHashSet: HashSet + insertion-order iteration.
     *   add/contains/remove → O(1)
     *   Iterates in insertion order
     *
     * USE WHEN: You need deduplication AND want to remember insertion order.
     * Example: Unique recent searches in UI, preserving order they were added.
     */
    public void linkedHashSetDemo() {
        Set<String> recentSearches = new LinkedHashSet<>();
        recentSearches.add("spring boot");
        recentSearches.add("jpa");
        recentSearches.add("spring boot"); // duplicate ignored, order preserved
        // recentSearches → ["spring boot", "jpa"]
    }

    /**
     * TreeSet: backed by TreeMap, elements always sorted.
     *   add/contains/remove → O(log n)
     *   first/last/subSet → O(log n)
     *
     * USE WHEN: Sorted unique elements, range queries.
     */
    public void treeSetDemo() {
        TreeSet<Integer> scores = new TreeSet<>();
        scores.add(85); scores.add(92); scores.add(78);
        scores.last();                    // O(log n) → 92 (highest score)
        scores.headSet(90);               // O(log n) → scores below 90
    }
}
