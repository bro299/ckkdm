const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('result');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    try {
        const response = await fetch(`/search?term=${searchTerm}`);
        if (!response.ok) throw new Error('Terjadi kesalahan saat mengambil data.');

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayResults(data) {
    resultDiv.innerHTML = '';
    if (data.length === 0) {
        resultDiv.textContent = 'Khodam tidak ditemukan.';
    } else {
        const resultList = document.createElement('ul');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name; // Sesuaikan dengan struktur data Anda
            resultList.appendChild(listItem);
        });
        resultDiv.appendChild(resultList);
    }
}
