<template>
  <div class="cart-list">
    <scroll class="content">
      <ul>
        <li>购物车1</li>
        <li>购物车2</li>
        <li>购物车3</li>
        <li>购物车4</li>
        <li>购物车5</li>
        <li>购物车6</li>
        <li>购物车7</li>
        <li>购物车8</li>
        <li>购物车9</li>
        <li>购物车10</li>
        <li>购物车11</li>
        <li>购物车12</li>
        <li>购物车13</li>
        <li>购物车14</li>
        <li>购物车15</li>
        <li>购物车16</li>
        <li>购物车17</li>
        <li>购物车18</li>
        <li>购物车19</li>
        <li>购物车20</li>
        <li>购物车21</li>
        <li>购物车22</li>
        <li>购物车23</li>
        <li>购物车24</li>
        <li>购物车25</li>
        <li>购物车26</li>
        <li>购物车27</li>
        <li>购物车28</li>
        <li>购物车29</li>
        <li>购物车30</li>
        <li>购物车31</li>
        <li>购物车32</li>
        <li>购物车33</li>
        <li>购物车34</li>
        <li>购物车35</li>
        <li>购物车36</li>
        <li>购物车37</li>
        <li>购物车38</li>
        <li>购物车39</li>
        <li>购物车40</li>
        <li>购物车41</li>
        <li>购物车42</li>
        <li>购物车43</li>
        <li>购物车44</li>
        <li>购物车45</li>
        <li>购物车46</li>
        <li>购物车47</li>
        <li>购物车48</li>
        <li>购物车49</li>
        <li>购物车50</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/content/scroll/Scroll.vue";

export default {
  name: "CartList",
  components: { Scroll },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>