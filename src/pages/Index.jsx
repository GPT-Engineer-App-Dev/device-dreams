import { Box, Container, Flex, Heading, Image, SimpleGrid, Text, VStack, Link, Input, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Laptop",
    price: 999,
    category: "Electronics",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 199,
    category: "Accessories",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Headphones",
    price: 149,
    category: "Accessories",
    image: "https://via.placeholder.com/150",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearchQuery && matchesCategory && matchesPrice;
  });
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.600" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="lg">ElectroShop</Heading>
        <Flex gap={4}>
          <Link href="#">Home</Link>
          <Link href="#">Products</Link>
          <Link href="#">Contact</Link>
        </Flex>
      </Flex>

      <Box as="main" p={4}>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          mb={6}
        />
        <Flex mb={6} gap={6}>
          <Box>
            <Heading as="h4" size="md" mb={2}>Categories</Heading>
            <CheckboxGroup onChange={handleCategoryChange}>
              <Stack spacing={2}>
                <Checkbox value="Electronics">Electronics</Checkbox>
                <Checkbox value="Accessories">Accessories</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={2}>Price Range</Heading>
            <Slider
              aria-label="price-range-slider"
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={50}
              onChangeEnd={handlePriceChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} index={0} />
              <SliderThumb boxSize={6} index={1} />
            </Slider>
            <Flex justifyContent="space-between">
              <Text>${priceRange[0]}</Text>
              <Text>${priceRange[1]}</Text>
            </Flex>
          </Box>
        </Flex>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Featured Products
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.image} alt={product.name} />
              <Box p={6}>
                <Heading as="h3" size="md" mb={2}>
                  {product.name}
                </Heading>
                <Text fontSize="xl" color="blue.600">
                  ${product.price}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box as="footer" bg="gray.800" color="white" p={4} mt={10}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>&copy; 2023 ElectroShop. All rights reserved.</Text>
          <Flex gap={4}>
            <Link href="#" isExternal>
              <FaFacebook />
            </Link>
            <Link href="#" isExternal>
              <FaTwitter />
            </Link>
            <Link href="#" isExternal>
              <FaInstagram />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Index;